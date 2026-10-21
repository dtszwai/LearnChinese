import React from 'react';
import styles from './styles.module.scss';

type Props = { children?: React.ReactNode };
const Py = ({ children }: Props) => (
  <>
    <span className={styles.pyCircle}>粵</span>
    {children}
  </>
);

export default Py;
