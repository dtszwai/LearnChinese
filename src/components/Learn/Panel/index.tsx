import React from 'react';
import Hint from '../Hint';
import styles from '../Interactive/index.module.scss';

export default function Panel({ title, answer, step, children, status = '' }) {
  return (
    <section className={title === '答案' ? styles.BlockRegex : styles.BlockContent} data-title={title} aria-label={title}>
      {answer && <Hint answer={answer} step={step} />}
      {children}
    </section>
  );
}
