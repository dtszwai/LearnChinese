import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import HomepageFeatures from '../components/HomepageFeatures';
import Sketch from '/img/index.svg'

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const HomepageHeader = () => {
    return (
      <header className={`hero hero--primary ${styles.heroBanner}`}>
        <div className="container">
          <div className={styles.row}>
            <div className={`col col--6`}>
              <h1 className={styles.title}>{siteConfig.tagline}</h1>
              <p className={styles.subtitle}>
                <span>古人學問無遺力，</span>
                <span>少壯工夫老始成。</span><br />
                <span>紙上得來終覺淺，</span>
                <span>絕知此事要躬行。</span>
              </p>
            </div>
            <div className="col col--6">
              <div className={styles.wrapper}>
                <img src={require('/img/index.png').default} />
                <Sketch className={styles.sketch} />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };

  return (
    <Layout title={siteConfig.tagline}>
      <HomepageHeader />
      <HomepageFeatures />
    </Layout >
  );
}
