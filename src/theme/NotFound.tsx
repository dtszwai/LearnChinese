import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './NotFound.module.scss';
import quotes from '@site/static/misc/quotes.json';
import Link from '@docusaurus/Link';

type Quotes = {
  text: string;
  source: string;
  language: string;
};

export default function NotFound() {
  const [randomQuote, setRandomQuote] = useState<Quotes>({
    text: '',
    source: '',
    language: '',
  });
  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const renderedBlockquote = () => (
    <blockquote className={styles.blockquote}>
      <p
        className={
          randomQuote.language === 'chinese' ? styles.chinese : styles.english
        }
      >
        {randomQuote.text}
      </p>
      <cite className={styles.source}>{randomQuote.source}</cite>
    </blockquote>
  );

  return (
    <Layout title='找不到頁面'>
      <main className='container '>
        <div className='row margin-vert--xl'>
          <div className='col col--6 col--offset-3'>
            <h1 className={styles.title}>找不到頁面</h1>
            <p style={{ textAlign: 'center' }}>
              沒有你請求的頁面，請檢查輸入的連結是否正確。
            </p>
            <Link className={`button button--lg ${styles.buttons}`} to='/'>
              🏠 回到首頁
            </Link>
            {renderedBlockquote()}
          </div>
        </div>
      </main>
    </Layout>
  );
}
