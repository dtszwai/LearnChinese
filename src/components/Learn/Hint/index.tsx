import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  answer: string[];
  step: { currentStep: number; lastStep: number };
}

export default ({ answer, step }: Props) => {
  const [showStatus, setShowStatus] = useState(false);

  const toggleShow = (e) => {
    if (e.altKey && e.key.toLowerCase() === 'h') {
      e.preventDefault();
      setShowStatus(!showStatus);
    }
  };

  useEffect(() => {
    addEventListener('keydown', toggleShow);
    return () => removeEventListener('keydown', toggleShow);
  }, [showStatus]);

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
    <Tooltip open={showStatus} title={hint} placement='top' className={styles.Hint} onKeyDown={toggleShow}>
      <span className={styles.ShowHint} onClick={() => setShowStatus(!showStatus)}>
        顯示答案
        <div className='Shortcut'>ALT + H</div>
      </span>
    </Tooltip>
  );
};
