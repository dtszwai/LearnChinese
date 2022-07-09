import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import App from './App';
import Answers from './Answers';
import Link from '@docusaurus/Link';
import postData from '@site/src/utils/postData';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import Review from './Review';

const GoogleFormsIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 88' style={{ width: '1rem', verticalAlign: 'top' }}>
    <path d='M58 88H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h36l22 22v60a6 6 0 0 1-6 6z' fill='#703db4' />
    <path d='m42 0 22 22H42z' fill='#532b86' />
    <path
      d='M50 39H24v-5h26zm0 7H24v5h26zm0 12H24v5h26zM16.5 34a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm0 12a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm0 12a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5z'
      fill='#fff'
    />
  </svg>
);

const Copy = ({ href }) => (
  <Link
    to={href}
    className='button button--primary not-prose'
    style={{ marginBottom: '1rem' }}
    onClick={() => postData({ Event: 'Quiz Copy' })}
  >
    複製至 Google Forms {GoogleFormsIcon}
  </Link>
);

const quizData = () => {
  const id = useActiveDocContext().activeDoc.id.split('/');
  const path = `${id[0]}/${id.at(-1)}`;
  return require(`@site/src/data/Quiz/${path}`);
};

export const Quiz = ({ data, href, checkAnswer = false }) => (
  <>
    {href && <Copy href={href} />}
    <App questions={data ?? quizData().questions} checkAnswer={checkAnswer} />
  </>
);

export const QuizAnswers = ({ data }) => <Answers questions={data ?? quizData().questions} />;

export const QuizSet = ({ data, href }) => (
  <Tabs>
    <TabItem value='開始評估' default attributes={{ 'data-quiz': 'Questions' }}>
      <Quiz data={data} href={href} checkAnswer />
    </TabItem>
    <TabItem value='題目庫' attributes={{ 'data-quiz': 'Answers' }}>
      <Answers questions={data ?? quizData()} />
    </TabItem>
  </Tabs>
);

export { Review };
