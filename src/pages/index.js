import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.heroPrimary)}>
      <div className="container">
        <h1 className={clsx('hero__title', styles.title)}>{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="hero__subtitle" style={{ fontSize: "calc(1.5rem + 3px)" }}>稽古有得，隨時劄記，久而類次成書。</p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)} to="/S1">
            開始閱覽 📕
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.tagline}`}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout >
  );
}
