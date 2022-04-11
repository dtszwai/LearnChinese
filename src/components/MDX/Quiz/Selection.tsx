import React from 'react';
import styles from './Game.module.scss';

type SelectionProps = {
  answerOptions: { answerText: string; isCorrect?: boolean }[];
  selectedOption: (arg0: boolean, arg1: number) => void;
};

export default function ({ answerOptions, selectedOption }: SelectionProps) {
  return (
    <div className={styles.AnswerSection}>
      {answerOptions.map((answerOption, i) => (
        <button
          className={styles.btn}
          onClick={() => selectedOption(answerOption.isCorrect, i)}
          key={i}
        >
          {String.fromCharCode(i + 65)}. {answerOption.answerText}
        </button>
      ))}
    </div>
  );
}
