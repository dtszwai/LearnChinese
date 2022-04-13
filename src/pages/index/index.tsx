import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Typer from './Typer';
import Sketch from '/img/index.svg';
import S1Text from '@site/docs/S1/index.mdx';
import S2Text from '@site/docs/S2/index.mdx';
import S3Text from '@site/docs/S3/index.mdx';
import styles from './styles.module.scss';

const Header = ({ siteConfig }) => (
  <header className={styles.heroBanner}>
    <div className={styles.bannerCol}>
      <h1 className={styles.title}>{siteConfig.tagline}</h1>
      <p className={styles.subtitle}>
        <Typer />
      </p>
    </div>
    <div className={styles.bannerCol}>
      <div className={styles.wrapper}>
        <img src={require('/img/index.png').default} />
        <Sketch className={styles.sketch} />
      </div>
    </div>
  </header>
);

const TextList = ({ grade, title, Src, color = 'inherit' }) => (
  <div className={styles.TextList} id={grade}>
    <div className={styles.heading}>
      <img
        src={require(`@site/static/img/${grade}.png`).default}
        style={{ alignSelf: 'center' }}
      />
      <Link to={grade}>
        <h2 style={{ color: color }}>{title}級課文</h2>
      </Link>
    </div>
    <Src />
  </div>
);

const Settext = () => (
  <div className={styles.TextList} id='settext' style={{ color: '#0ea5e9' }}>
    <div className={styles.heading}>
      <img
        src={require(`@site/static/img/settext.png`).default}
        style={{ alignSelf: 'center' }}
      />
      <Link to='settext'>
        <h2 style={{ color: '#0ea5e9' }}>指定文言</h2>
      </Link>
    </div>
    <div className='text-list'>
      <ul>
        <li>
          <Link to={'settext/岳陽樓記'}>岳陽樓記</Link>
        </li>
        <li>
          <Link to={'settext/念奴嬌．赤壁懷古'}>念奴嬌．赤壁懷古</Link>
        </li>
        <li>
          <Link to={'settext/聲聲慢．秋情'}>聲聲慢．秋情</Link>
        </li>
        <li>
          <Link to={'settext/青玉案．元夕'}>青玉案．元夕</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default () => (
  <Layout title={useDocusaurusContext().siteConfig.tagline}>
    <Header {...useDocusaurusContext()} />
    <section className={styles.TOC}>
      <div className={styles.Tab}>
        <a href='#S1'>中一級課文</a>
        {/* <a href='#S2'>中二級課文</a> */}
        <a href='#S3'>中三級課文</a>
        <a href='#settext'>指定文言</a>
      </div>
      <TextList grade='S1' title='中一' Src={S1Text} color='#ec4899' />
      {/* <TextList grade='S2' title='中二' Src={S2Text} /> */}
      <TextList grade='S3' title='中三' Src={S3Text} color='#6366f1' />
      <Settext />
    </section>
  </Layout>
);
