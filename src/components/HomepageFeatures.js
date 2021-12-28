import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import S1Text from '/docs/S1.md';
import S2Text from '/docs/S2.md';
import S3Text from '/docs/S3.md';
import Link from '@docusaurus/Link';

function Feature() {
  return (
    <>
      <div className={clsx('col col--4')}>
        <div className="text--center">
          <Link to="/S1" className={styles.grade}><img className={styles.featureImg} src={require('@site/static/img/intro1.png').default} /></Link>
        </div>
        <div className={clsx('padding-horiz--md featureText')}>
          <Link to="/S1" className={styles.grade}><h2>中一級課文</h2></Link>
          <S1Text className="padding-horiz--md" />
        </div>
      </div>

      <div className={clsx('col col--4')}>
        <div className="text--center">
          <Link to="/S2" className={styles.grade}><img className={styles.featureImg} src={require('@site/static/img/intro2.png').default} /></Link>
        </div>
        <div className={clsx('padding-horiz--md featureText')}>
          <Link to="/S2" className={styles.grade}><h2>中二級課文</h2></Link>
          <S2Text className="padding-horiz--md" />
        </div>
      </div>

      <div className={clsx('col col--4')}>
        <div className="text--center">
          <Link to="/S3" className={styles.grade}><img className={styles.featureImg} src={require('@site/static/img/intro3.png').default} /></Link>
        </div>
        <div className={clsx('padding-horiz--md featureText')}>
          <Link to="/S3" className={styles.grade}><h2 className={styles.grade}>中三級課文</h2></Link>
          <S3Text className="padding-horiz--md" />
        </div>
      </div>
    </>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Feature />
        </div>
      </div>
    </section>
  );
}