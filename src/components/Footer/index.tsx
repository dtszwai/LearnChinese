import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './style.module.scss';
import Link from '@docusaurus/Link';

export default () => (
  <footer className={styles.footer}>
    <Link to={'/'}>
      <img src={useBaseUrl('/img/logo.png')} className={styles.logo} />
    </Link>
    <ul className={styles.list}>
      <li>
        <Link to={useBaseUrl('about')}>About</Link>
      </li>
    </ul>
  </footer>
);
