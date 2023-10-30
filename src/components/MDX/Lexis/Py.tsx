import React from 'react';
import styles from './styles.module.scss';

const Py = ({ children }) => (
  <>
    <span className={styles.pyCircle}>粵</span>
    {children}
  </>
)

export default Py