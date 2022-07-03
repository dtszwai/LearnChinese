import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.scss';
import lessons from '@site/src/data/Learn/index.json';
import Link from '@docusaurus/Link';
import { ImFilesEmpty, ImArrowRight2 } from 'react-icons/im';
import clsx from 'clsx';

export default () => {
  const title = '學習';

  return (
    <Layout title={title}>
      <main className='container'>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>練好基本功，打穩語文根基。</p>
        </header>
        <div className={styles.row}>
          {Object.keys(lessons).map((key) => (
            <Card key={lessons[key].title} lesson={lessons[key]} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

const Card = ({ lesson }) => {
  const stepCount = require(`@site/src/data/Learn/${lesson.slug}.json`).length ?? 0;

  return (
    <div className={clsx(styles.Card, { [styles.Disable]: lesson?.disabled })}>
      <Link className={styles.Topic} to={!lesson?.disabled && `/learn/${lesson.slug}`}>
        <div className={styles.TopicDetail}>
          <h2 className={styles.TopicTitle}>{lesson.title}</h2>
          <p className={styles.TopicDescription}>{lesson.description}</p>
          <div className={styles.TopicStats}>
            <div className={styles.TopicStatsInfo}>
              <span>
                <ImFilesEmpty size={15} />
                {stepCount}
              </span>
            </div>
            <span className={styles.TopicAction}>
              開始
              <ImArrowRight2 size={15} />
            </span>
          </div>
        </div>
      </Link>
      {lesson.disabled && <p className={styles.alert}>尚未開放</p>}
    </div>
  );
};
