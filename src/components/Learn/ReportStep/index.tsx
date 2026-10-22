import React from 'react';
import Link from '@docusaurus/Link';
import { MdOutlineFeedback, MdOutlineOndemandVideo } from 'react-icons/md';
import styles from './index.module.scss';

type Props = {
  title: string;
  step: { currentStep: number; lastStep: number };
  onOpenVideo?: () => void;
};

const ReportStep = ({ title, step, onOpenVideo }: Props) => (
  <div className={styles.ReportStep}>
    <Link
      className={styles.Action}
      to={`https://docs.google.com/forms/d/e/1FAIpQLSewteJTEVkqRZux55d_-Z0UI2EncxfGvZtT4I1A5oKObqcy5Q/viewform?usp=pp_url&entry.1511255577=${title} Step:${
        step.currentStep + 1
      }`}
    >
      <MdOutlineFeedback size={16} aria-hidden='true' />
      回報問題
    </Link>
    {onOpenVideo && (
      <button type='button' className={styles.Action} aria-haspopup='dialog' onClick={onOpenVideo}>
        <MdOutlineOndemandVideo size={16} aria-hidden='true' />
        觀看影片
      </button>
    )}
  </div>
);

export default ReportStep;
