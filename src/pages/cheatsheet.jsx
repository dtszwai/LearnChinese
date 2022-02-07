import React from 'react';
import data from './cheatsheet.json';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Collapse from '../components/Cheatsheet/Collapse';
import ItemTitle from '../components/Cheatsheet/ItemTitle';
import Demo from '../components/Cheatsheet/Demo';
import styles from './cheatsheet.module.scss';

export default function cheatsheet() {
  const columns = [data.slice(0, 1),data.slice(1)];
  const title = '語文基礎知識';

  return (
    <Layout title={title}>
      <div className='container'>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>練好基本功，打穩語文根基。</p>
        </header>
        <div className='row'>
          {columns.map((column, index) => (
            <div key={index} className={clsx(`col col--4 ${styles.column}`)}>
              {column.map((row, rowIndex) => (
                <div key={rowIndex}>
                  <h4 className={styles.category}>{row.title}</h4>
                  {row.data.map((item) => (
                    <Collapse
                      key={item.code}
                      title={<ItemTitle data={item} />}
                      description={item.description}
                    >
                      <Demo data={item} />
                    </Collapse>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
