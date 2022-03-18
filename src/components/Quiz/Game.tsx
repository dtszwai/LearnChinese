import React, { useState } from 'react';
import styles from './Game.module.scss';
import { IoShareSocialOutline } from 'react-icons/io5';
import copy from 'copy-text-to-clipboard';

export default function Game({ data, setSelectedAnswer }) {
  const { questions } = data;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answerList, setAnswerList] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [checkMark, crossMark] = ['✔️', '❌'];

  const handleAnswerOptionClick = (isCorrect = false, i: number) => {
    setScore(score + +isCorrect);
    setSelectedAnswer((prepState) => ({ ...prepState, [currentQuestion]: i }));
    setAnswerList((prepState) => [
      ...prepState,
      isCorrect ? checkMark : crossMark,
    ]);

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
    const str = `${data.title} ${score}/${
      questions.length
    }\n\n${answerList.join('')}`;
    copy(str) && setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2500);
  };

  const wrongAnswer = () => {
    let arr = answerList
      .map((e, i) => (e === crossMark ? i + 1 : ''))
      .filter(String)
      .join('、');
    return arr.length ? (
      <>
        <br />
        錯題：{arr}
      </>
    ) : null;
  };

  const renderedResult = () => {
    return (
      <div className={styles.ScoreSection}>
        你在 {questions.length} 題裏答對了 {score} 題。
        {wrongAnswer()}
        <button className={styles.btn} onClick={resetForm}>
          再做一次
        </button>
        <button
          className={styles.btn}
          onClick={shareScore}
          style={{ backgroundColor: '#6AAA64', color: 'white' }}
        >
          {copySuccess ? (
            '已複製'
          ) : (
            <>
              分享成績&nbsp;
              <IoShareSocialOutline />{' '}
            </>
          )}
        </button>
      </div>
    );
  };

  const renderedGame = () => {
    return (
      <>
        <div className={styles.QuestionSection}>
          <p className={styles.QuestionCount}>
            第 {currentQuestion + 1}/{questions.length} 題
          </p>
          <p className={styles.QuestionText}>
            {questions[currentQuestion].questionText}
          </p>
        </div>

        <div className={styles.AnswerSection}>
          {questions[currentQuestion].answerOptions.map((answerOption, i) => (
            <button
              className={styles.btn}
              onClick={() => handleAnswerOptionClick(answerOption.isCorrect, i)}
              key={i}
            >
              {String.fromCharCode(i + 65)}. {answerOption.answerText}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styles.Game}>
      {showScore ? renderedResult() : renderedGame()}
    </div>
  );
}
