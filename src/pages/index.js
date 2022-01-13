import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import Sketch from '/img/index.svg'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.heroPrimary)}>
      <div className="container">
        <div className={styles.row}>
          <div className={clsx('col col--6', styles.col)}>
            <h1 className={clsx('hero__title', styles.title)}>
              {siteConfig.tagline}
            </h1>
            <p className={clsx('hero__subtitle', styles.subtitle)}>
              <span>古人學問無遺力，</span>
              <span>少壯工夫老始成。</span><br />
              <span>紙上得來終覺淺，</span>
              <span>絕知此事要躬行。</span>
            </p>
            {/* <div className={styles.buttons}>
              <Link
                className={clsx('button button--secondary button--lg', styles.heroButton)} to="/S1">
                開始閱覽 📕
              </Link>
            </div> */}
          </div>
          <div className="col-lg-6">
            <div className={styles.wrapper}>
              <img src={require('/img/index.png').default} />
              <Sketch className={styles.sketch} />
            </div>
          </div>
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
