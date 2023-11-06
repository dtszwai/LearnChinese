import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Sketch from '/img/index.svg';
import styles from './index.module.scss';
import TypeIt from 'typeit-react';
import S1Text from '../../docs/contents/S1/index.mdx';

const Typer = () => (
  <TypeIt
    getBeforeInit={(instance) =>
      instance
        .pause(700)
        .type('鳥宿池邊樹，', { speed: 300, delay: 900 })
        .type('僧推月下門。', { speed: 300, delay: 1200 })
        .move(-4, { speed: 150, delay: 800 })
        .delete(1, { delay: 700 })
        .type('<strong style="color:#8783D1">敲</strong>', { delay: 300 })
        .move(4, { delay: 1000 })
        .break({ delay: 700 })
        .type('水田飛白鷺，夏木囀黃鸝。', { speed: 300, delay: 1200 })
        .move(-12, { speed: 150, delay: 600 })
        .type('<strong style="color:#E27396">漠漠</strong>', {
          speed: 500,
          delay: 1200,
        })
        .move(6, { speed: 200, delay: 500 })
        .type('<strong style="color:#E27396">陰陰</strong>', {
          speed: 500,
          delay: 700,
        })
        .move(6, { speed: 200 })
    }
    options={{ speed: 100, waitUntilVisible: true }}
  />
);

const Header = ({ title }) => (
  <header className={styles.heroBanner}>
    <div className={styles.bannerCol}>
      <h1 className={styles.title}>{title}</h1>
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
      <img src={require(`@site/static/img/${grade}.png`).default} style={{ alignSelf: 'center' }} />
      <Link to={grade}>
        <h2 style={{ color: color }}>{title}級課文</h2>
      </Link>
    </div>
    <Src />
  </div>
);

const Settext = () => {
  const settext = [
    '論仁、論孝、論君子',
    '魚我所欲也',
    '逍遙遊（節錄）',
    '勸學（節錄）',
    '廉頗藺相如列傳（節錄）',
    '出師表',
    '師說',
    '始得西山宴遊記',
    '岳陽樓記',
    '六國論',
    '山居秋暝',
    '月下獨酌（其一）',
    '登樓',
    '念奴嬌．赤壁懷古',
    '聲聲慢．秋情',
    '青玉案．元夕',
  ];
  return (
    <div className={styles.TextList} id='settext' style={{ color: '#0ea5e9' }}>
      <div className={styles.heading}>
        <img src={require(`@site/static/img/settext.png`).default} style={{ alignSelf: 'center' }} />
        <Link to='settext'>
          <h2 style={{ color: '#0ea5e9' }}>指定文言</h2>
        </Link>
      </div>
      <div className='text-list'>
        <ul>
          {settext.map((text) => (
            <li key={text}>
              <Link to={`settext/${text}`}>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default () => (
  <Layout title={useDocusaurusContext().siteConfig.tagline}>
    <Header title={useDocusaurusContext().siteConfig.tagline} />
    <section className={styles.TOC}>
      <div className={styles.Tab}>
        <a href='#S1'>中一級課文</a>
        {/* <a href='#S2'>中二級課文</a>
        <a href='#S3'>中三級課文</a> */}
        <a href='#settext'>指定文言</a>
      </div>
      <TextList grade='S1' title='中一' Src={S1Text} color='#ec4899' />
      {/* <TextList grade='S2' title='中二' Src={S2Text} /> */}
      {/* <TextList grade='S3' title='中三' Src={S3Text} color='#6366f1' /> */}
      <Settext />
    </section>
  </Layout>
);
