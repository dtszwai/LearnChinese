import React from 'react';
import App from './App';
import Answers from './Answers';
import Link from '@docusaurus/Link';
import postData from '@site/src/utils/postData';
import Review from './Review';
import { readQuizData } from './types';

type CopyProps = { href: string };
type Props = { data: unknown; href?: string; checkAnswer?: boolean };
type AnswersProps = Pick<Props, 'data'>;

const Copy = ({ href }: CopyProps) => {
  const handleCopy = () => {
    postData({ Event: 'Quiz Copy' });
  };
  return (
    <Link to={href} className='button button--primary not-prose' style={{ marginBottom: '1rem' }} onClick={handleCopy}>
      複製至 Google Forms
      {
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 64 88'
          style={{ width: '1rem', verticalAlign: 'top', marginLeft: '5px' }}
        >
          <path d='M58 88H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h36l22 22v60a6 6 0 0 1-6 6z' fill='#703db4' />
          <path d='m42 0 22 22H42z' fill='#532b86' />
          <path
            d='M50 39H24v-5h26zm0 7H24v5h26zm0 12H24v5h26zM16.5 34a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm0 12a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm0 12a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5z'
            fill='#fff'
          />
        </svg>
      }
    </Link>
  );
};
const Quiz = ({ data, href, checkAnswer = false }: Props) => {
  return (
    <>
      {href && <Copy href={href} />}
      <App questions={readQuizData({ questions: data }).questions} checkAnswer={checkAnswer} />
    </>
  );
};

const QuizAnswers = ({ data }: AnswersProps) => <Answers questions={readQuizData({ questions: data }).questions} />;

export { Quiz, QuizAnswers, Review };
