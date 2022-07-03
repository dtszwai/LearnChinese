import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.scss';
import { useLocation } from '@docusaurus/router';
import LearnPage from '@site/src/components/Learn/index';
import lessons from '@site/src/data/Learn/index.json';
import NotFound from '@site/src/theme/NotFound';
import clsx from 'clsx';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function PageTopic() {
  if (!ExecutionEnvironment.canUseDOM) return null;

  const location = useLocation();
  const lesson = lessons[location.pathname.split('/').slice(-1)[0]];
  if (!lessons.hasOwnProperty(lesson.slug)) return <NotFound />;
  const data = require(`@site/src/data/Learn/${lesson.slug}.json`);

  return (
    <Layout title={lesson.title}>
      <main className={clsx('container', styles.container)}>
        <LearnPage data={data} lesson={lesson} />
      </main>
    </Layout>
  );
}
