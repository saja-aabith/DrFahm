import React, { useState } from 'react';
import './MiniDemo.css';

const DEMO_QUESTIONS = [
  {
    id: 1,
    question: "إذا كان س + 5 = 12، فما قيمة 2س؟",
    questionEn: "If x + 5 = 12, what is the value of 2x?",
    options: [
      { id: 'A', text: '14', textAr: '١٤' },
      { id: 'B', text: '10', textAr: '١٠' },
      { id: 'C', text: '7', textAr: '٧' },
      { id: 'D', text: '12', textAr: '١٢' }
    ],
    correctAnswer: 'A',
    explanation: 'First solve for x: x = 12 - 5 = 7. Then 2x = 2(7) = 14',
    explanationAr: 'أولاً نحل قيمة س: س = ١٢ - ٥ = ٧. ثم ٢س = ٢(٧) = ١٤'
  },
  {
    id: 2,
    question: "ما هو الاستنتاج المنطقي من: كل طالب مجتهد ناجح، أحمد مجتهد؟",
    questionEn: "What is the logical conclusion: All diligent students succeed, Ahmed is diligent?",
    options: [
      { id: 'A', text: 'Ahmed will succeed', textAr: 'أحمد سينجح' },
      { id: 'B', text: 'Ahmed might fail', textAr: 'أحمد قد يرسب' },
      { id: 'C', text: 'All students are diligent', textAr: 'كل الطلاب مجتهدون' },
      { id: 'D', text: 'Success requires luck', textAr: 'النجاح يحتاج حظ' }
    ],
    correctAnswer: 'A',
    explanation: 'This is a syllogism: If all diligent students succeed, and Ahmed is diligent, then Ahmed will succeed.',
    explanationAr: 'هذا قياس منطقي: إذا كان كل طالب مجتهد ناجح، وأحمد مجتهد، إذن أحمد سينجح.'
  },
  {
    id: 3,
    question: "إذا كان ٣س - ٢ = ١٣، فما قيمة س؟",
    questionEn: "If 3x - 2 = 13, what is the value of x?",
    options: [
      { id: 'A', text: '3', textAr: '٣' },
      { id: 'B', text: '5', textAr: '٥' },
      { id: 'C', text: '4', textAr: '٤' },
      { id: 'D', text: '6', textAr: '٦' }
    ],
    correctAnswer: 'B',
    explanation: 'Add 2 to both sides: 3x = 15. Then divide by 3: x = 5',
    explanationAr: 'نضيف ٢ للطرفين: ٣س = ١٥. ثم نقسم على ٣: س = ٥'
  },
  {
    id: 4,
    question: "أي من التالي يعادل ٢⁴؟",
    questionEn: "Which of the following equals 2⁴?",
    options: [
      { id: 'A', text: '8', textAr: '٨' },
      { id: 'B', text: '16', textAr: '١٦' },
      { id: 'C', text: '12', textAr: '١٢' },
      { id: 'D', text: '6', textAr: '٦' }
    ],
    correctAnswer: 'B',
    explanation: '2⁴ = 2 × 2 × 2 × 2 = 16',
    explanationAr: '٢⁴ = ٢ × ٢ × ٢ × ٢ = ١٦'
  },
  {
    id: 5,
    question: "ما هي العلاقة بين: قلم - كتابة؟",
    questionEn: "What is the relationship between: pen - writing?",
    options: [
      { id: 'A', text: 'Tool - Purpose', textAr: 'أداة - غرض' },
      { id: 'B', text: 'Cause - Effect', textAr: 'سبب - نتيجة' },
      { id: 'C', text: 'Part - Whole', textAr: 'جزء - كل' },
      { id: 'D', text: 'Similar', textAr: 'مشابه' }
    ],
    correctAnswer: 'A',
    explanation: 'A pen is a tool used for the purpose of writing.',
    explanationAr: 'القلم أداة تستخدم لغرض الكتابة.'
  },
  {
    id: 6,
    question: "إذا كان النسبة ٣:٤ = س:١٢، فما قيمة س؟",
    questionEn: "If the ratio 3:4 = x:12, what is the value of x?",
    options: [
      { id: 'A', text: '6', textAr: '٦' },
      { id: 'B', text: '8', textAr: '٨' },
      { id: 'C', text: '9', textAr: '٩' },
      { id: 'D', text: '10', textAr: '١٠' }
    ],
    correctAnswer: 'C',
    explanation: 'Cross multiply: 3 × 12 = 4 × x, so 36 = 4x, therefore x = 9',
    explanationAr: 'نضرب تبادلياً: ٣ × ١٢ = ٤ × س، إذن ٣٦ = ٤س، وبالتالي س = ٩'
  },
  {
    id: 7,
    question: "أي من الكلمات التالية لا تنتمي للمجموعة؟",
    questionEn: "Which word doesn't belong in the group?",
    options: [
      { id: 'A', text: 'Happy - Joyful', textAr: 'سعيد - مبتهج' },
      { id: 'B', text: 'Sad - Gloomy', textAr: 'حزين - كئيب' },
      { id: 'C', text: 'Fast - Quick', textAr: 'سريع - عجول' },
      { id: 'D', text: 'Hot - Cold', textAr: 'حار - بارد' }
    ],
    correctAnswer: 'D',
    explanation: 'Hot and Cold are opposites, while the others are synonyms.',
    explanationAr: 'حار وبارد متضادان، بينما الباقي مترادفات.'
  },
  {
    id: 8,
    question: "ما هو ٢٥٪ من ٨٠؟",
    questionEn: "What is 25% of 80?",
    options: [
      { id: 'A', text: '15', textAr: '١٥' },
      { id: 'B', text: '20', textAr: '٢٠' },
      { id: 'C', text: '25', textAr: '٢٥' },
      { id: 'D', text: '30', textAr: '٣٠' }
    ],
    correctAnswer: 'B',
    explanation: '25% = 1/4, so 80 ÷ 4 = 20',
    explanationAr: '٢٥٪ = ¼، إذن ٨٠ ÷ ٤ = ٢٠'
  }
];

function MiniDemo({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isArabic, setIsArabic] = useState(true);
  const [score, setScore] = useState(0);

  const question = DEMO_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === DEMO_QUESTIONS.length - 1;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (answerId) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    if (answerId === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (onComplete) {
        onComplete();
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const getAnswerClassName = (answerId) => {
    if (!showFeedback) return 'demo-answer';
    if (answerId === question.correctAnswer) return 'demo-answer correct';
    if (answerId === selectedAnswer && answerId !== question.correctAnswer) {
      return 'demo-answer incorrect';
    }
    return 'demo-answer disabled';
  };

  return (
    <div className="mini-demo">
      <div className="demo-header">
        <div className="demo-controls">
          <span className="demo-dot red"></span>
          <span className="demo-dot yellow"></span>
          <span className="demo-dot green"></span>
        </div>
        <div className="demo-lang-toggle">
          <button 
            className={isArabic ? 'active' : ''} 
            onClick={() => setIsArabic(true)}
          >
            AR
          </button>
          <button 
            className={!isArabic ? 'active' : ''} 
            onClick={() => setIsArabic(false)}
          >
            EN
          </button>
        </div>
      </div>
      
      <div className="demo-content">
        <div className="demo-progress">
          <span>Question {currentQuestion + 1} of {DEMO_QUESTIONS.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / DEMO_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="demo-question">
          <p>{isArabic ? question.question : question.questionEn}</p>
        </div>
        
        <div className="demo-answers">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={getAnswerClassName(option.id)}
              onClick={() => handleAnswerSelect(option.id)}
            >
              <span className="answer-letter">{option.id}</span>
              <span className="answer-text">
                {isArabic ? option.textAr : option.text}
              </span>
              {showFeedback && option.id === question.correctAnswer && (
                <span className="answer-check">✓</span>
              )}
              {showFeedback && option.id === selectedAnswer && option.id !== question.correctAnswer && (
                <span className="answer-cross">✗</span>
              )}
            </div>
          ))}
        </div>
        
        {showFeedback && (
          <div className={`demo-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-badge">
              {isCorrect ? (isArabic ? 'صحيح!' : 'Correct!') : (isArabic ? 'خطأ' : 'Incorrect')}
            </div>
            <p>{isArabic ? question.explanationAr : question.explanation}</p>
            
            <button className="btn-demo-next" onClick={handleNext}>
              {isLastQuestion 
                ? (isArabic ? 'إكمال في Dr Fahm' : 'Continue in Dr Fahm')
                : (isArabic ? 'السؤال التالي' : 'Next Question')
              }
            </button>
          </div>
        )}
      </div>
      
      {showFeedback && (
        <div className="demo-score">
          Score: {score}/{currentQuestion + 1}
        </div>
      )}
    </div>
  );
}

export default MiniDemo;