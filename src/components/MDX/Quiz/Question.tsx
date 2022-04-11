import React from 'react';
import styles from './Game.module.scss';

type multiQuestions = {
  currentQuestion: number;
  totalQuestions?: number;
  questionText: string;
  label?: never;
  info?: never;
};

type Review = {
  questionText: string;
  label: string;
  currentQuestion?: never;
  totalQuestions?: never;
  info: React.ReactNode;
};

export default function Question({
  currentQuestion,
  totalQuestions,
  questionText,
  label,
  info,
}: multiQuestions | Review) {
  const questionNumber = () => (
    <p className={styles.QuestionCount}>
      第 {currentQuestion + 1}
      {totalQuestions && `/${totalQuestions}`} 題
    </p>
  );

  return (
    <div className={styles.QuestionSection}>
      {typeof currentQuestion !== 'undefined' ? (
        questionNumber()
      ) : (
        <p className={styles.QuestionCount}>{label}</p>
      )}
      <p className={styles.QuestionText}>{questionText}</p>
      {info}
    </div>
  );
}
