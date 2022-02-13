import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import styles from "./Game.module.scss";
import { IoShareSocialOutline } from "react-icons/io5";

export default function Game({ questions, setSelectedAnswer }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answerList, setAnswerList] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const { pathname } = useLocation();

  const handleAnswerOptionClick = (isCorrect, i) => {
    setSelectedAnswer(prepState => ({ ...prepState, [currentQuestion]: i }));
    if (isCorrect) {
      setScore(score + 1);
      setAnswerList(prepState => [...prepState, '✔️'])
    } else {
      setAnswerList(prepState => [...prepState, '❌'])
    }

    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length
      ? setCurrentQuestion(nextQuestion)
      : setShowScore(true);
  };

  const resetForm = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setAnswerList([]);
  };

  const shareScore = () => {
    const str = `${pathname.match(/(?<=\.\d+)\D+/g)} ${score}/${questions.length}分\n\n` +
      `${answerList.join('')}\n\n` +
      `${new Date().toLocaleDateString('zh')}\n\n` +
      `${location.origin + pathname}`;

    setCopySuccess(true);
    navigator.clipboard.writeText(str);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2500)
  }

  return (
    <div className={styles.Game}>
      {showScore ? (
        <div className={styles.ScoreSection}>
          你在 {questions.length} 題裏答對了 {score} 題。
          <button className={styles.btn} onClick={resetForm}>再做一次</button>
          <button className={styles.btn} onClick={shareScore} style={{ backgroundColor: '#6AAA64', color: 'white' }}>{!copySuccess ? <span>分享成績 {IoShareSocialOutline()}</span> : '已複製'}</button>
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
                  className={styles.btn}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect, i)
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
