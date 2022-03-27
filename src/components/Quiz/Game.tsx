import React, { useState } from 'react';
import styles from './Game.module.scss';
import Question from './Question';
import Selection from './Selection';
import Result from './Result';

export default function Game({ data, setSelectedAnswer }) {
  const { questions } = data;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [result, setResult] = useState<boolean[]>([]);

  const handleAnswerOptionClick = (isCorrect = false, selected: number) => {
    setScore((prep) => prep + (isCorrect ? 1 : 0));
    setSelectedAnswer((prep) => ({ ...prep, [currentQuestion]: selected }));
    setResult((prep) => [...prep, isCorrect]);
    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length
      ? setCurrentQuestion(nextQuestion)
      : setShowScore(true);
  };

  const reset = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setResult([]);
  };

  return (
    <div className={styles.Wrapper}>
      {showScore ? (
        <Result
          score={score}
          result={result}
          reset={reset}
          totalQuestions={questions.length}
        />
      ) : (
        <>
          <Question
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            questionText={questions[currentQuestion].questionText}
          />
          <Selection
            answerOptions={questions[currentQuestion].answerOptions}
            selectedOption={handleAnswerOptionClick}
          />
        </>
      )}
    </div>
  );
}
