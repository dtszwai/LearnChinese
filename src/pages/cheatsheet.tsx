import React from 'react';
import data from './cheatsheet.json';
import Layout from '@theme/Layout';
import Collapse from '../components/Cheatsheet/Collapse';
import Demo from '../components/Cheatsheet/Demo';
import styles from './cheatsheet.module.scss';

type json = {
  [key: string]: string;
};

export default function cheatsheet() {
  const columns = [data.slice(0, 1), data.slice(1)];
  const title = '語文基礎知識';

  const renderedHeader = () => (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>練好基本功，打穩語文根基。</p>
    </header>
  );

  const renderedContent = () => (
    <div className='row' style={{ marginBottom: '5rem' }}>
      {columns.map((column, index) => (
        <div key={index} className={`col col--4 ${styles.column}`}>
          {column.map((row: { title: string; data: json[] }) => (
            <section key={row.title}>
              <h4 className={styles.category}>{row.title}</h4>
              {row.data.map((item) => (
                <Collapse key={item.code} title={item}>
                  <Demo data={item} />
                </Collapse>
              ))}
            </section>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <Layout title={title}>
      <main className='container'>
        {renderedHeader()}
        {renderedContent()}
      </main>
    </Layout>
  );
}
