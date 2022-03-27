import React from 'react';
import styles from './Game.module.scss';

type ResultProps = {
  score: number;
  result?: boolean[];
  reset?: () => void;
  totalQuestions?: number;
};

export const WrongAnswer = (result: boolean[]) => {
  let arr = result
    .map((e, i) => (!e ? i + 1 : ''))
    .filter(String)
    .join('、');
  return arr.length ? <p>錯題：{arr}</p> : null;
};

export default function ({
  result,
  score,
  reset,
  totalQuestions,
}: ResultProps) {
  return (
    <div className={styles.ScoreSection}>
      <p>
        你
        {totalQuestions && (
          <>
            在&nbsp;<span style={{ color: '#8783D1' }}>{totalQuestions}</span>
            &nbsp;題裏
          </>
        )}
        答對了&nbsp;<span style={{ color: '#E27396' }}>{score}</span>
        &nbsp;題。
      </p>
      {result && WrongAnswer(result)}
      {reset && (
        <button className={styles.btn} onClick={reset}>
          再做一次
        </button>
      )}
    </div>
  );
}
