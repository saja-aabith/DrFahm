import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InteractiveHeroDemo.css';

const DEMO_QUESTIONS = [
  {
    id: 1,
    text: "If x + 5 = 12, what is the value of 2x?",
    textAr: "إذا كان x + 5 = 12، فما قيمة 2x؟",
    options: [
      { id: 'A', text: '14', textAr: '١٤' },
      { id: 'B', text: '10', textAr: '١٠' },
      { id: 'C', text: '7', textAr: '٧' },
      { id: 'D', text: '12', textAr: '١٢' }
    ],
    correctAnswer: 'A',
    explanation: "First solve for x: x + 5 = 12, so x = 7. Then multiply by 2: 2x = 14.",
    explanationAr: "أولاً نحل المعادلة لإيجاد x: إذا كان x + 5 = 12، فإن x = 7. ثم نضرب في 2: إذن 2x = 14."
  },
  {
    id: 2,
    text: "What is 15% of 200?",
    textAr: "ما هي نسبة 15% من 200؟",
    options: [
      { id: 'A', text: '25', textAr: '٢٥' },
      { id: 'B', text: '30', textAr: '٣٠' },
      { id: 'C', text: '35', textAr: '٣٥' },
      { id: 'D', text: '40', textAr: '٤٠' }
    ],
    correctAnswer: 'B',
    explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30.",
    explanationAr: "نسبة 15% من 200 = (15/100) × 200 = 0.15 × 200 = 30."
  },
  {
    id: 3,
    text: "If a triangle has sides of length 3, 4, and 5, what type of triangle is it?",
    textAr: "إذا كان للمثلث أضلاع بأطوال 3 و 4 و 5، فما نوع هذا المثلث؟",
    options: [
      { id: 'A', text: 'Equilateral', textAr: 'متساوي الأضلاع' },
      { id: 'B', text: 'Isosceles', textAr: 'متساوي الساقين' },
      { id: 'C', text: 'Right-angled', textAr: 'قائم الزاوية' },
      { id: 'D', text: 'Obtuse', textAr: 'منفرج الزاوية' }
    ],
    correctAnswer: 'C',
    explanation: "3² + 4² = 9 + 16 = 25 = 5². This satisfies the Pythagorean theorem, so it's a right-angled triangle.",
    explanationAr: "بما أن 3² + 4² = 9 + 16 = 25 = 5²، فهذا يحقق نظرية فيثاغورس، لذلك هو مثلث قائم الزاوية."
  }
];

function InteractiveHeroDemo() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [language, setLanguage] = useState('EN');

  const question = DEMO_QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (answerId) => {
    if (showFeedback) return; // Prevent changing after first selection
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    // Update score if correct
    if (answerId === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < DEMO_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'AR' : 'EN');
  };

  if (isComplete) {
    return (
      <div className="demo-container">
        <div className="product-demo">
          <div className="demo-header">
            <div className="demo-controls">
              <span className="demo-dot red"></span>
              <span className="demo-dot yellow"></span>
              <span className="demo-dot green"></span>
            </div>
            <div className="demo-lang-toggle">
              <span className={language === 'AR' ? 'active' : ''} onClick={toggleLanguage}>AR</span>
              <span className={language === 'EN' ? 'active' : ''} onClick={toggleLanguage}>EN</span>
            </div>
          </div>
          
          <div className="demo-content" dir={language === 'AR' ? 'rtl' : 'ltr'}>
            <div className="demo-complete">
              <div className="complete-icon">✓</div>
              <h3>{language === 'EN' ? 'Demo Complete!' : 'اكتمل العرض التوضيحي!'}</h3>
              <p className="score-display">
                {language === 'EN' 
                  ? `You got ${score} out of ${DEMO_QUESTIONS.length} correct`
                  : `لقد أجبت بشكل صحيح على ${score} من ${DEMO_QUESTIONS.length}`}
              </p>
              <p className="complete-message">
                {language === 'EN'
                  ? "See how instant feedback helps you learn? This is just a taste of what Dr Fahm offers across 10 worlds with hundreds of questions."
                  : "هل ترى كيف تساعدك التغذية الراجعة الفورية على التعلم؟ هذه مجرد لمحة عما يقدمه Dr Fahm عبر 10 عوالم تحتوي على مئات الأسئلة."}
              </p>
              <button 
                onClick={() => navigate('/register')} 
                className="btn-continue"
              >
                {language === 'EN' ? 'Continue to Sign Up →' : 'المتابعة للتسجيل ←'}
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-restart"
              >
                {language === 'EN' ? 'Try demo again' : 'إعادة المحاولة'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-container">
      <div className="product-demo interactive">
        <div className="demo-header">
          <div className="demo-controls">
            <span className="demo-dot red"></span>
            <span className="demo-dot yellow"></span>
            <span className="demo-dot green"></span>
          </div>
          <div className="demo-lang-toggle">
            <span className={language === 'AR' ? 'active' : ''} onClick={toggleLanguage}>AR</span>
            <span className={language === 'EN' ? 'active' : ''} onClick={toggleLanguage}>EN</span>
          </div>
        </div>
        
        <div className="demo-content" dir={language === 'AR' ? 'rtl' : 'ltr'}>
          <div className="demo-progress">
            {language === 'EN' 
              ? `Question ${currentQuestion + 1} of ${DEMO_QUESTIONS.length}`
              : `السؤال ${currentQuestion + 1} من ${DEMO_QUESTIONS.length}`}
          </div>
          
          <div className="demo-question">
            <h4>{language === 'EN' ? `Question ${currentQuestion + 1}` : `السؤال ${currentQuestion + 1}`}</h4>
            <p>{language === 'EN' ? question.text : question.textAr}</p>
          </div>
          
          <div className="demo-answers">
            {question.options.map((option) => (
              <div
                key={option.id}
                className={`demo-answer ${
                  selectedAnswer === option.id ? 'selected' : ''
                } ${
                  showFeedback && option.id === question.correctAnswer ? 'correct' : ''
                } ${
                  showFeedback && selectedAnswer === option.id && option.id !== question.correctAnswer ? 'incorrect' : ''
                }`}
                onClick={() => handleAnswerSelect(option.id)}
              >
                <span className="answer-letter">{option.id}</span>
                <span className="answer-text">
                  {language === 'EN' ? option.text : option.textAr}
                </span>
                {showFeedback && option.id === question.correctAnswer && (
                  <span className="answer-check">✓</span>
                )}
                {showFeedback && selectedAnswer === option.id && option.id !== question.correctAnswer && (
                  <span className="answer-cross">✗</span>
                )}
              </div>
            ))}
          </div>
          
          {showFeedback && (
            <>
              <div className={`demo-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="feedback-badge">
                  {isCorrect ? (language === 'EN' ? 'Correct!' : 'صحيح!') : (language === 'EN' ? 'Incorrect' : 'خطأ')}
                </div>
                <p>{language === 'EN' ? question.explanation : question.explanationAr}</p>
              </div>
              
              <button 
                className="btn-next"
                onClick={handleNext}
              >
                {currentQuestion < DEMO_QUESTIONS.length - 1 
                  ? (language === 'EN' ? 'Next Question →' : 'السؤال التالي ←') 
                  : (language === 'EN' ? 'See Results →' : 'عرض النتائج ←')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InteractiveHeroDemo;