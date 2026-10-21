import React, { MouseEventHandler } from 'react';
import cx from 'classnames';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import styles from './index.module.scss';

interface Props {
  totalSteps: number;
  currentStep: number;
  success: boolean;
  error: boolean;
  nextStep: MouseEventHandler<HTMLButtonElement>;
  prevStep: MouseEventHandler<HTMLButtonElement>;
}

export default ({ totalSteps, currentStep, nextStep, prevStep, success, error }: Props) => (
  <div className={styles.LearnFooter}>
    <div className={styles.LearnFooterRow}>
      <div className={styles.LearnFooterPrevWrapper}>
        {currentStep > 0 && (
          <button type='button' aria-label='上一題' className={styles.NavigationStepPrev} onClick={prevStep}>
            <div className='Shortcut'>Shift + Enter</div>
            <div className={styles.NavigationStepText}>
              <AiOutlineArrowLeft className={styles.NavigationStepIcon} size={20} />
              上一題
            </div>
          </button>
        )}
      </div>
      <div className={styles.LearnFooterNextWrapper}>
        {currentStep < totalSteps && (
          <button type='button' aria-label='下一題' aria-disabled={!success} className={cx(styles.NavigationStepNext, { [styles.NextReady]: success })} onClick={nextStep}>
            {success ? <>
              <BsFillUnlockFill className={styles.ReadyUnlock} aria-hidden='true' />
              <span>下一題</span>
              <kbd className='Shortcut'>Enter</kbd>
              <AiOutlineArrowRight className={styles.ReadyArrow} size={18} aria-hidden='true' />
            </> : <>
            <div className={styles.NavigationStepNextWrapper}>
              <div className='Shortcut'>Enter</div>
                <BsFillLockFill
                  className={cx(styles.NavigationStepStatusIcon, {
                    [styles.NavigationStepStatusIconError]: error,
                  })}
                />
            </div>
            <div className={styles.NavigationStepText}>
              下一題
              <AiOutlineArrowRight className={styles.NavigationStepIcon} size={20} />
            </div>
            </>}
          </button>
        )}
      </div>
    </div>
  </div>
);
