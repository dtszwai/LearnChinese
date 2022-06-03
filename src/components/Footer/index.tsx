import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './style.module.scss';
import Link from '@docusaurus/Link';

export default () => (
  <footer className={styles.footer}>
    <img src={useBaseUrl('/img/logo.png')} className={styles.logo} />
    <ul className={styles.list}>
      <li>
        <Link to={useBaseUrl('about')}>About</Link>
      </li>
    </ul>
  </footer>
);
