import React from 'react';
import styles from './index.module.scss';

const toPercent = (current: number, total: number) => Math.round((current / total) * 100);

interface Props {
  current: number;
  total: number;
}

const Progress = ({ current, total }: Props) => (
  <div className={styles.Progress}>
    <div className={styles.ProgressBar}>
      <div className={styles.ProgressLine} style={{ width: `${toPercent(current, total)}%` }} />
    </div>
    <div className={styles.ProgressStatus}>{`${current} / ${total}`}</div>
  </div>
);

export default Progress;
