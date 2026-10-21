import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.scss';
import lessons from '@site/src/data/Learn/index.json';
import Link from '@docusaurus/Link';
import { ImArrowRight2 } from 'react-icons/im';
import useLocalStorage from '@site/src/components/Learn/useLocalStorage';
import { readLessonProgress, LessonProgress } from '@site/src/components/Learn/lessonProgress';
import type { Lesson } from '@site/src/components/Learn/types';

const groups = [
  { id: 'expression', title: '語言與表達', description: '細讀字句，認識不同手法的表達效果。', lessons: ['rhetoric', 'description', 'lyricism'] },
  { id: 'structure', title: '篇章與論證', description: '掌握文章的組織，理解敘事與說理的方法。', lessons: ['narrative', 'argumentation'] },
  { id: 'classical', title: '文言閱讀', description: '從語境入手，逐步讀懂文言字句。', lessons: ['classical-chinese'] },
];

const isPublished = (lesson: Lesson) => lesson.published !== false;
const visibleGroups = groups
  .map(group => ({ ...group, lessons: group.lessons.filter(slug => isPublished(lessons[slug])) }))
  .filter(group => group.lessons.length > 0);

export default function LearnHome() {
  return (
    <Layout title='學習'>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>學習</h1>
          <p className={styles.description}>練好基本功，打穩語文根基。</p>
        </header>
        {visibleGroups.map(group => (
          <section key={group.id} className={styles.group} aria-labelledby={`${group.id}-title`}>
            <header className={styles.groupHeader}>
              <h2 id={`${group.id}-title`}>{group.title}</h2>
              <p>{group.description}</p>
            </header>
            <div className={styles.grid}>
              {group.lessons.map(slug => <Card key={slug} lesson={lessons[slug]} />)}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
}

function Card({ lesson }) {
  const total = require(`@site/src/data/Learn/${lesson.slug}.json`).length;
  const [record, , loaded] = useLocalStorage<LessonProgress | undefined>(
    lesson.key, undefined, value => readLessonProgress(value, total),
  );
  const started = loaded && record !== undefined;
  const current = started ? Math.min(total, Math.max(1, record.currentStep + 1)) : 0;
  const furthest = started ? Math.min(total - 1, Math.max(0, record.lastStep ?? 0)) : 0;

  return (
    <Link className={styles.card} to={`/learn/${lesson.slug}`}>
      <div className={styles.cardContent}>
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.stepCount}>{current} / {total}</span>
        <span className={styles.action}>{started ? '繼續學習' : '開始學習'}<ImArrowRight2 size={14} aria-hidden='true' /></span>
      </div>
      <div className={styles.progress} aria-hidden='true'>
        <span style={{ width: `${furthest / Math.max(1, total - 1) * 100}%` }} />
      </div>
    </Link>
  );
}
