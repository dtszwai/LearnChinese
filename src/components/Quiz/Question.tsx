import React from 'react';
import styles from './Game.module.scss';

type multiQuestions = {
  currentQuestion: number;
  totalQuestions?: number;
  questionText: string;
};

type singalQuestion = {
  currentQuestion?: never;
  totalQuestions?: never;
  questionText: string;
};

export default function Question({
  currentQuestion,
  totalQuestions,
  questionText,
}: multiQuestions | singalQuestion) {
  const questionNumber = () => (
    <p className={styles.QuestionCount}>
      第 {currentQuestion + 1}
      {totalQuestions && `/${totalQuestions}`} 題
    </p>
  );

  return (
    <div className={styles.QuestionSection}>
      {typeof currentQuestion !== 'undefined' && questionNumber()}
      <p className={styles.QuestionText}>{questionText}</p>
    </div>
  );
}
