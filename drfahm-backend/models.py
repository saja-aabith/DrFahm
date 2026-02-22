"""
DrFahm Data Models
Postgres-only. All timestamps stored in UTC.
No SQLite. No legacy tables dropped — legacy data is handled via migration.
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from sqlalchemy import UniqueConstraint, Index

db = SQLAlchemy()


def utcnow():
    """Return current UTC time as a naive datetime (Postgres stores UTC by convention)."""
    return datetime.now(timezone.utc).replace(tzinfo=None)


# ─── Canonical Enums ──────────────────────────────────────────────────────────
# Keep as module-level constants so they can be imported and validated elsewhere.

VALID_EXAMS = frozenset({'qudurat', 'tahsili'})

# Maps each exam to its ordered list of world_keys.
# Position index (0-based) == world_position - 1.
EXAM_WORLDS = {
    'qudurat': [
        'math_100',
        'math_150',
        'math_200',
        'math_250',
        'math_300',
        'verbal_100',
        'verbal_150',
        'verbal_200',
        'verbal_250',
        'verbal_300',
    ],
    'tahsili': [
        'math_100',
        'math_150',
        'math_200',
        'math_250',
        'biology_100',
        'biology_150',
        'chemistry_100',
        'chemistry_150',
        'physics_100',
        'physics_150',
    ],
}

# Band value (total questions in world) derived from world_key suffix.
WORLD_BAND = {
    'math_100': 100,    'verbal_100': 100,
    'math_150': 150,    'verbal_150': 150,
    'math_200': 200,    'verbal_200': 200,
    'math_250': 250,    'verbal_250': 250,
    'math_300': 300,    'verbal_300': 300,
    'biology_100': 100, 'biology_150': 150,
    'chemistry_100': 100, 'chemistry_150': 150,
    'physics_100': 100, 'physics_150': 150,
}

# All valid world_key values across all exams.
VALID_WORLD_KEYS = frozenset(WORLD_BAND.keys())

# Display names for world_keys.
WORLD_DISPLAY_NAME = {
    'math_100': 'Math 100',       'verbal_100': 'Verbal 100',
    'math_150': 'Math 150',       'verbal_150': 'Verbal 150',
    'math_200': 'Math 200',       'verbal_200': 'Verbal 200',
    'math_250': 'Math 250',       'verbal_250': 'Verbal 250',
    'math_300': 'Math 300',       'verbal_300': 'Verbal 300',
    'biology_100': 'Biology 100', 'biology_150': 'Biology 150',
    'chemistry_100': 'Chemistry 100', 'chemistry_150': 'Chemistry 150',
    'physics_100': 'Physics 100', 'physics_150': 'Physics 150',
}

LEVELS_PER_WORLD = 10

# Entitlement enums
ENTITLEMENT_SOURCES = frozenset({'trial', 'individual', 'bundle', 'school'})
ENTITLEMENT_STATUSES = frozenset({'active', 'expired', 'pending', 'past_due', 'canceled'})

# User roles
USER_ROLES = frozenset({'student', 'org_admin', 'drfahm_admin'})

# Lock reason enum (stable — do not rename without updating frontend in same chunk)
LOCK_REASONS = frozenset({
    'no_entitlement',
    'trial_expired',
    'beyond_world2_trial_cap',
    'prereq_incomplete',
    'level_locked',
    'seat_no_coverage',
})


# ─── Models ───────────────────────────────────────────────────────────────────

class Organization(db.Model):
    """Schools / institutions purchasing seat-based access."""
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(80), unique=True, nullable=False)
    contact_email = db.Column(db.String(120), nullable=True)
    seat_capacity = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    # The DrFahm admin who created this org record
    created_by_admin_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)

    # Relationships
    students = db.relationship('User', foreign_keys='User.org_id', backref='organization', lazy='dynamic')
    exam_entitlements = db.relationship('OrgExamEntitlement', backref='organization', lazy='dynamic', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Organization {self.slug}>'


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=True)   # nullable for school CSV students
    username = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(200), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='student')  # student | org_admin | drfahm_admin
    org_id = db.Column(db.Integer, db.ForeignKey('organizations.id', ondelete='SET NULL'), nullable=True)
    xp = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    last_active_at = db.Column(db.DateTime, nullable=True)

    # Relationships
    exam_entitlements = db.relationship('UserExamEntitlement', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    level_completions = db.relationship('LevelCompletion', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    question_attempts = db.relationship('QuestionAttempt', backref='user', lazy='dynamic', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.username} [{self.role}]>'

    def touch(self):
        """Update last_active_at to now (UTC). Caller must commit."""
        self.last_active_at = utcnow()


class UserExamEntitlement(db.Model):
    """
    One row per (user, exam). Single source of truth for a user's access to an exam.
    Upserted by Stripe webhook and trial-start logic.

    entitlement_source: trial | individual | bundle | school
    entitlement_status: active | expired | pending | past_due | canceled

    Access rules (enforced by get_effective_exam_access helper in access.py):
    - trial + active: worlds 1-2 accessible while trial_expires_at > utcnow()
    - individual/bundle/school + active: all worlds accessible
    - past_due / canceled: no access (unless a separate valid trial row exists)
    """
    __tablename__ = 'user_exam_entitlements'
    __table_args__ = (
        # One entitlement row per user per exam.
        # When user upgrades from trial to paid, we update this row (upsert).
        UniqueConstraint('user_id', 'exam_identifier', name='uq_user_exam_entitlement'),
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    exam_identifier = db.Column(db.String(20), nullable=False)   # qudurat | tahsili
    entitlement_source = db.Column(db.String(20), nullable=False)  # trial | individual | bundle | school
    entitlement_status = db.Column(db.String(20), nullable=False, default='active')

    # Stripe references (null for trial / school entitlements)
    stripe_subscription_id = db.Column(db.String(200), nullable=True)
    stripe_customer_id = db.Column(db.String(200), nullable=True)

    # Trial window (UTC naive)
    trial_started_at = db.Column(db.DateTime, nullable=True)
    trial_expires_at = db.Column(db.DateTime, nullable=True)

    # Paid window (UTC naive, null = no expiry for active subscriptions)
    paid_started_at = db.Column(db.DateTime, nullable=True)
    paid_expires_at = db.Column(db.DateTime, nullable=True)

    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=utcnow, onupdate=utcnow)

    def __repr__(self):
        return f'<UserExamEntitlement user={self.user_id} exam={self.exam_identifier} src={self.entitlement_source} status={self.entitlement_status}>'


class OrgExamEntitlement(db.Model):
    """
    School-level exam coverage. Grants all org members access to the covered exam.
    Students covered by this have no trial — they get direct access.
    """
    __tablename__ = 'org_exam_entitlements'
    __table_args__ = (
        UniqueConstraint('org_id', 'exam_identifier', name='uq_org_exam_entitlement'),
    )

    id = db.Column(db.Integer, primary_key=True)
    org_id = db.Column(db.Integer, db.ForeignKey('organizations.id', ondelete='CASCADE'), nullable=False)
    exam_identifier = db.Column(db.String(20), nullable=False)  # qudurat | tahsili
    entitlement_status = db.Column(db.String(20), nullable=False, default='active')  # active | expired | canceled

    stripe_subscription_id = db.Column(db.String(200), nullable=True, unique=True)
    stripe_customer_id = db.Column(db.String(200), nullable=True)

    valid_from = db.Column(db.DateTime, nullable=False, default=utcnow)
    valid_until = db.Column(db.DateTime, nullable=True)  # null = no expiry

    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=utcnow, onupdate=utcnow)

    def __repr__(self):
        return f'<OrgExamEntitlement org={self.org_id} exam={self.exam_identifier} status={self.entitlement_status}>'


class Question(db.Model):
    """
    Individual question. Belongs to exactly one (exam, world_key).
    `index` is 0-based and determines which level the question belongs to:
        level = floor(index / questions_per_level) + 1
        where questions_per_level = WORLD_BAND[world_key] / LEVELS_PER_WORLD

    Cumulative delivery: level N delivers indices [0, N * questions_per_level).
    No shuffling. Sorted by index ascending.
    """
    __tablename__ = 'questions'
    __table_args__ = (
        UniqueConstraint('exam', 'world_key', 'index', name='uq_question_exam_world_index'),
        Index('ix_questions_exam_world', 'exam', 'world_key'),
    )

    id = db.Column(db.Integer, primary_key=True)
    exam = db.Column(db.String(20), nullable=False)        # qudurat | tahsili
    world_key = db.Column(db.String(30), nullable=False)   # math_100 | verbal_150 | ...
    index = db.Column(db.Integer, nullable=False)          # 0-based, unique within (exam, world_key)

    question_text = db.Column(db.Text, nullable=False)
    option_a = db.Column(db.String(500), nullable=False)
    option_b = db.Column(db.String(500), nullable=False)
    option_c = db.Column(db.String(500), nullable=False)
    option_d = db.Column(db.String(500), nullable=False)
    correct_answer = db.Column(db.String(1), nullable=False)   # A | B | C | D
    explanation = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    def questions_per_level(self):
        """Integer: WORLD_BAND[world_key] / LEVELS_PER_WORLD"""
        return WORLD_BAND[self.world_key] // LEVELS_PER_WORLD

    def level_number(self):
        """1-based level this question belongs to, derived from index."""
        qpl = WORLD_BAND[self.world_key] // LEVELS_PER_WORLD
        return (self.index // qpl) + 1

    def __repr__(self):
        return f'<Question {self.exam}/{self.world_key}[{self.index}]>'


class LevelCompletion(db.Model):
    """
    Tracks whether a user has passed a given level.
    A level is passed when the user scores 100% on all cumulative questions.
    Re-attempts are allowed; passed=True is set on first 100% score and never reverted.
    """
    __tablename__ = 'level_completions'
    __table_args__ = (
        UniqueConstraint(
            'user_id', 'exam_identifier', 'world_key', 'level_number',
            name='uq_level_completion'
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    exam_identifier = db.Column(db.String(20), nullable=False)
    world_key = db.Column(db.String(30), nullable=False)
    level_number = db.Column(db.Integer, nullable=False)   # 1-10

    passed = db.Column(db.Boolean, nullable=False, default=False)
    best_score_pct = db.Column(db.Float, nullable=False, default=0.0)  # 0-100
    attempts_count = db.Column(db.Integer, nullable=False, default=0)

    first_passed_at = db.Column(db.DateTime, nullable=True)    # UTC, set once
    last_attempted_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    def __repr__(self):
        return f'<LevelCompletion user={self.user_id} {self.exam_identifier}/{self.world_key} L{self.level_number} passed={self.passed}>'


class QuestionAttempt(db.Model):
    """
    Individual question answer record. Append-only.
    Used for per-question immediate feedback and level scoring.
    Multiple rows per (user, question) allowed (re-attempts).
    """
    __tablename__ = 'question_attempts'
    __table_args__ = (
        Index('ix_qa_user_exam_world_level', 'user_id', 'exam_identifier', 'world_key', 'level_number'),
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    exam_identifier = db.Column(db.String(20), nullable=False)
    world_key = db.Column(db.String(30), nullable=False)
    level_number = db.Column(db.Integer, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id', ondelete='CASCADE'), nullable=False)
    chosen_option = db.Column(db.String(1), nullable=False)   # A | B | C | D
    is_correct = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    question = db.relationship('Question', lazy='joined')

    def __repr__(self):
        return f'<QuestionAttempt user={self.user_id} q={self.question_id} correct={self.is_correct}>'


class StripeEvent(db.Model):
    """
    Idempotency log for processed Stripe webhook events.
    Before processing any event, check if stripe_event_id already exists.
    """
    __tablename__ = 'stripe_events'

    id = db.Column(db.Integer, primary_key=True)
    stripe_event_id = db.Column(db.String(200), unique=True, nullable=False)
    event_type = db.Column(db.String(100), nullable=False)
    processed_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    # Store raw payload for debugging / re-processing. Can be large; limit in practice.
    raw_payload = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<StripeEvent {self.stripe_event_id} [{self.event_type}]>'