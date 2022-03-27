import React from 'react';
import data from './cheatsheet.json';
import Layout from '@theme/Layout';
import Collapse from '../components/Cheatsheet/Collapse';
import Demo from '../components/Cheatsheet/Demo';
import styles from './cheatsheet.module.scss';

export default function cheatsheet() {
  const columns = [data.slice(0, 1), data.slice(1)];
  const title = '語文基礎知識';
  const hash = typeof window !== 'undefined' && decodeURI(window.location.hash);

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
          {column.map((row) => (
            <section key={row.title}>
              <h4 className={styles.category}>{row.title}</h4>
              {row.data.map((item) => {
                let isDefaultOpen =
                  hash === `#${row.title}-${item.code}` ? true : false;
                return (
                  <Collapse
                    key={item.code}
                    id={`${row.title}-${item.code}`}
                    title={item}
                    defaultOpen={isDefaultOpen}
                  >
                    <Demo data={item} />
                  </Collapse>
                );
              })}
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
