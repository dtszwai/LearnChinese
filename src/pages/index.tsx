import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Sketch from '/img/index.svg';
import S1Text from '@site/docs/S1/index.mdx';
import S2Text from '@site/docs/S2/index.mdx';
import S3Text from '@site/docs/S3/index.mdx';
import styles from './index.module.scss';
import TypeIt from 'typeit-react';

const Type = () => {
  return (
    <>
      <span>鳥宿池邊樹，</span>
      <TypeIt
        getBeforeInit={(instance) =>
          instance
            .pause(500)
            .type('僧推月下門。', { speed: 300 })
            .pause(900)
            .move(-4, { speed: 100 })
            .pause(500)
            .delete(1)
            .pause(700)
            .type('<strong style="color:#8783D1">敲</strong>', { delay: 300 })
            .move(4, { delay: 700 })
            .break({ delay: 500 })
            .type('水田飛白鷺，夏木囀黃鸝。', { speed: 200 })
            .pause(1200)
            .move(-12, { speed: 150 })
            .type('<strong style="color:#E27396">漠漠</strong>', { speed: 500 })
            .pause(1200)
            .move(6, { speed: 200 })
            .pause(500)
            .type('<strong style="color:#E27396">陰陰</strong>', { speed: 500 })
            .move(6, { speed: 200 })
        }
        options={{ speed: 100, waitUntilVisible: true }}
      />
    </>
  );
};

function HomepageHeader({ siteConfig }) {
  return (
    <header className={`hero hero--primary ${styles.heroBanner}`}>
      <div className='container'>
        <div className={styles.row}>
          <div className={`col col--6`}>
            <h1 className={styles.title}>{siteConfig.tagline}</h1>
            <p className={styles.subtitle}>
              <Type />
              {/* <br />
              <span>古人學問無遺力，</span>
              <span>少壯工夫老始成。</span>
              <br />
              <span>紙上得來終覺淺，</span>
              <span>絕知此事要躬行。</span> */}
            </p>
            {/* <a
              className={clsx('button button--primary button--lg')}
              href=''>
              開始閱讀&nbsp;&nbsp;→
            </a> */}
          </div>
          <div className='col col--6'>
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

// function StartSection() {
//   return (
//     <section className={clsx('padding-vert--xl', styles.section)}>
//       <div className='container'>
//         <div className='row'>
//           <div className='col col--4'>
//             <h2></h2>
//           </div>
//           <div className='col col--8'>
//             <p></p>
//             <a className={clsx('button button--primary button--lg')} href=''>
//               開始閱讀&nbsp;&nbsp;→
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function TextsSection() {
  const renderedForm = (grade: string, title: string, Markdown: any) => {
    return (
      <div className={clsx('col col--4')}>
        <div className='text--center'>
          <Link to={`/${grade}`} className={styles.grade}>
            <img
              className={styles.IntroImg}
              src={require(`@site/static/img/${grade}.png`).default}
            />
          </Link>
        </div>
        <div className={clsx('padding-horiz--md featureText')}>
          <Link to={`/${grade}`} className={styles.grade}>
            <h2>{title}級課文</h2>
          </Link>
          <Markdown />
        </div>
      </div>
    );
  };

  return (
    <section className='padding-vert--xl'>
      <div className='container'>
        <div className='row'>
          {renderedForm('S1', '中一', S1Text)}
          {renderedForm('S2', '中二', S2Text)}
          {renderedForm('S3', '中三', S3Text)}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title={useDocusaurusContext().siteConfig.tagline}>
      <HomepageHeader {...useDocusaurusContext()} />
      {/* <StartSection /> */}
      <TextsSection />
    </Layout>
  );
}
