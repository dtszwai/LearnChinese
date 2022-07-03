import React from 'react';
import Link from '@docusaurus/Link';
import { MdOutlineFeedback } from 'react-icons/md';
import styles from './index.module.scss';

interface Props {
  title: string;
  step: number;
}

export default ({ title, step }: Props) => (
  <div className={styles.ReportStep}>
    <Link
      className={styles.link}
      to={`https://docs.google.com/forms/d/e/1FAIpQLSewteJTEVkqRZux55d_-Z0UI2EncxfGvZtT4I1A5oKObqcy5Q/viewform?usp=pp_url&entry.1511255577=${title} Step:${
        step + 1
      }`}
    >
      <MdOutlineFeedback size={16} style={{ verticalAlign: 'text-bottom' }} />
      &nbsp;回報問題
    </Link>
  </div>
);
