import React from 'react';
import cx from 'clsx';
import Hint from '../Hint';
import styles from '../Interactive/index.module.scss';
import type { LessonProgress } from '../lessonProgress';

type Props = {
  title: string;
  children?: React.ReactNode;
  answer?: string[] | false | null;
  step: LessonProgress;
  status?: string;
  className?: string;
};

const Panel = ({ title, answer, step, children, className }: Props) => {
  return (
    <section
      className={cx(title === '答案' ? styles.BlockRegex : styles.BlockContent, className)}
      data-title={title}
      aria-label={title}
    >
      {answer && <Hint answer={answer} step={step} />}
      {children}
    </section>
  );
};

export default Panel;
