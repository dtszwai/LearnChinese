import React, { useState } from "react";
import styles from "./Game.module.scss";

export default function Game({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    isCorrect && setScore(score + 1)

    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length
      ? setCurrentQuestion(nextQuestion)
      : setShowScore(true);
  };

  const resetForm = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
  };

  return (
    <div className={styles.Game}>
      {showScore ? (
        <div className={styles.ScoreSection}>
          你在 {questions.length} 題裏答對了 {score} 題。
          <button onClick={resetForm}>再做一次</button>
        </div>
      ) : (
        <>
          <div className={styles.QuestionSection}>
            <div className={styles.QuestionCount}>
              <span>
                第 {currentQuestion + 1}/{questions.length} 題
              </span>
            </div>
            <div className={styles.QuestionText}>
              {questions[currentQuestion].questionText}
            </div>
          </div>

          <div className={styles.AnswerSection}>
            {questions[currentQuestion].answerOptions.map(
              (answerOption, i) => (
                <button
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                  key={i}
                >
                  {String.fromCharCode(i + 65)}. {answerOption.answerText}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
