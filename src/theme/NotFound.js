import React from 'react';
import Layout from '@theme/Layout';
import styles from './NotFound.module.scss';
import quotes from '@site/static/misc/quotes.json';

function NotFound() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Layout title="找不到頁面">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className={styles.title}>找不到頁面</h1>
            <p style={{ textAlign: 'center' }}>沒有你請求的頁面，請檢查輸入的連結是否正確。</p>
            <p style={{ textAlign: 'center' }}><a href="/library">點擊這裏回到首頁</a></p>
            <blockquote className={styles.blockquote}>
              <p className={randomQuote.language === 'chinese' ? styles.chinese : styles.english}>{randomQuote.text}</p>
              <cite className={styles.source}>{randomQuote.source}</cite>
            </blockquote>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default NotFound;
