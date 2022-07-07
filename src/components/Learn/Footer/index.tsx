import React, { MouseEventHandler } from 'react';
import cx from 'classnames';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import styles from './index.module.scss';

interface Props {
  steps: object[];
  currentStep: number;
  success: boolean;
  error: boolean;
  nextStep: MouseEventHandler<HTMLDivElement>;
  prevStep: MouseEventHandler<HTMLDivElement>;
}

export default ({ steps, currentStep, nextStep, prevStep, success, error }: Props) => (
  <div className={styles.LearnFooter}>
    <div className={styles.LearnFooterRow}>
      <div className={styles.LearnFooterPrevWrapper}>
        {currentStep > 0 && (
          <div className={styles.NavigationStepPrev} onClick={prevStep}>
            <div className='Shortcut'>Shift + Enter</div>
            <div className={styles.NavigationStepText}>
              <AiOutlineArrowLeft className={styles.NavigationStepIcon} size={20} />
              上一題
            </div>
          </div>
        )}
      </div>
      <div className={styles.LearnFooterNextWrapper}>
        {currentStep < steps.length - 1 && (
          <div className={styles.NavigationStepNext} onClick={nextStep}>
            <div className={styles.NavigationStepNextWrapper}>
              <div className='Shortcut'>Enter</div>
              {success ? (
                <BsFillUnlockFill
                  className={cx(styles.NavigationStepStatusIcon, {
                    [styles.NavigationStepStatusIconUnlock]: success,
                  })}
                />
              ) : (
                <BsFillLockFill
                  className={cx(styles.NavigationStepStatusIcon, {
                    [styles.NavigationStepStatusIconError]: error,
                  })}
                />
              )}
            </div>
            <div className={styles.NavigationStepText}>
              下一題
              <AiOutlineArrowRight className={styles.NavigationStepIcon} size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
