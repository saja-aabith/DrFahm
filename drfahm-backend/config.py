"""
DrFahm Backend Configuration
All thresholds and limits are env-driven with defaults.
"""
import os
from datetime import timedelta


class Config:
    # ── Flask core ──────────────────────────────────────────────────────────
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-CHANGE-IN-PROD')
    DEBUG = os.environ.get('FLASK_ENV', 'development') == 'development'

    # ── JWT ─────────────────────────────────────────────────────────────────
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'dev-jwt-secret-CHANGE-IN-PROD')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)
    JWT_TOKEN_LOCATION = ['headers']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'

    # ── Database ─────────────────────────────────────────────────────────────
    # Must be Postgres in all environments.
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'postgresql://drfahm:drfahm@localhost:5432/drfahm_dev'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }

    # ── Trial limits ─────────────────────────────────────────────────────────
    # Number of calendar days from first access before trial expires.
    TRIAL_DURATION_DAYS = int(os.environ.get('TRIAL_DURATION_DAYS', '7'))
    # Maximum world position (1-indexed) accessible during trial.
    TRIAL_MAX_WORLD_POSITION = int(os.environ.get('TRIAL_MAX_WORLD_POSITION', '2'))

    # ── Stripe ───────────────────────────────────────────────────────────────
    STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY', '')
    STRIPE_PUBLISHABLE_KEY = os.environ.get('STRIPE_PUBLISHABLE_KEY', '')
    STRIPE_WEBHOOK_SECRET = os.environ.get('STRIPE_WEBHOOK_SECRET', '')

    # Price IDs — must be set in production; left blank triggers 501 responses.
    STRIPE_PRICE_INDIVIDUAL_QUDURAT = os.environ.get('STRIPE_PRICE_INDIVIDUAL_QUDURAT', '')
    STRIPE_PRICE_INDIVIDUAL_TAHSILI = os.environ.get('STRIPE_PRICE_INDIVIDUAL_TAHSILI', '')
    STRIPE_PRICE_BUNDLE = os.environ.get('STRIPE_PRICE_BUNDLE', '')
    # School plan price is passed per checkout (seat count * unit_amount); no fixed price ID.

    # ── CORS ─────────────────────────────────────────────────────────────────
    FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')

    # ── Dev flags ─────────────────────────────────────────────────────────────
    # When true, email verification links are printed to stdout instead of sent.
    DEV_SKIP_EMAIL_VERIFICATION = (
        os.environ.get('DEV_SKIP_EMAIL_VERIFICATION', 'true').lower() == 'true'
    )

    # ── Server ────────────────────────────────────────────────────────────────
    PORT = int(os.environ.get('PORT', '5001'))