import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import quotes from '@site/src/data/quotes.json';
import Link from '@docusaurus/Link';

type Quote = (typeof quotes)[number];
type QuoteProps = { randomQuote: Quote; setRandomQuote: (quote: Quote) => void };
const RenderedBlockquote = ({ randomQuote, setRandomQuote }: QuoteProps) => (
  <>
    <blockquote className={styles.blockquote}>
      <p className={styles[randomQuote.language]}>{randomQuote.text}</p>
      <cite className={styles.source}>{randomQuote.source}</cite>
    </blockquote>
    <button
      className={`button ${styles.buttons}`}
      onClick={() => setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)])}
    >
      換一個
    </button>
  </>
);

export default () => {
  const [randomQuote, setRandomQuote] = useState<Quote>({ language: '', text: '', source: '' });

  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <main className='container '>
      <div className='row margin-vert--xl'>
        <div className='col col--6 col--offset-3'>
          <h1 className={styles.title}>找不到頁面</h1>
          <p style={{ textAlign: 'center' }}>沒有你請求的頁面，請檢查輸入的連結是否正確。</p>
          <Link className={`button button--lg ${styles.buttons}`} to='/'>
            🏠 回到首頁
          </Link>
          <RenderedBlockquote {...{ randomQuote, setRandomQuote }} />
        </div>
      </div>
    </main>
  );
};
