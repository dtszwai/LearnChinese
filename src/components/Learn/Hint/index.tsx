import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  answer: string[];
  step: { currentStep: number; lastStep: number };
}

export default ({ answer, step }: Props) => {
  const [showStatus, setShowStatus] = useState(false);

  const toggleShow = (e: KeyboardEvent) => {
    if (e.altKey && e.key.toLowerCase() === 'h') {
      e.preventDefault();
      setShowStatus((shown) => !shown);
    }
  };

  useEffect(() => {
    addEventListener('keydown', toggleShow);
    return () => removeEventListener('keydown', toggleShow);
  }, []);

  useEffect(() => {
    setShowStatus(false);
  }, [answer]);

  useEffect(() => {
    setShowStatus(false);
  }, [step]);

  const hint = (
    <div className={styles.HintAnswer}>
      {answer.map((answer) => (
        <div className={styles.HintAnswerItem} key={answer}>
          {answer}
        </div>
      ))}
    </div>
  );

  return (
    <Tooltip
      describeChild
      open={showStatus}
      title={hint}
      placement='top'
      className={styles.Hint}
      componentsProps={{ tooltip: { className: styles.Tooltip } }}
    >
      <button
        type='button'
        className={styles.ShowHint}
        onClick={() => setShowStatus((shown) => !shown)}
        aria-expanded={showStatus}
      >
        顯示答案
        <span className='Shortcut'>ALT + H</span>
      </button>
    </Tooltip>
  );
};
