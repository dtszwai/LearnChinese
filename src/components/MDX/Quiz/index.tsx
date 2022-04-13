import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import App from './App';
import Answers from './Answers';
import Link from '@docusaurus/Link';
import Fetch from '../../Fetch';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Review from './Review';

const GoogleFormsIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 64 88'
    style={{ width: '1rem', verticalAlign: 'top' }}
  >
    <path
      d='M58 88H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h36l22 22v60a6 6 0 0 1-6 6z'
      fill='#703db4'
    />
    <path d='m42 0 22 22H42z' fill='#532b86' />
    <path
      d='M50 39H24v-5h26zm0 7H24v5h26zm0 12H24v5h26zM16.5 34a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm0 12a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm0 12a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5z'
      fill='#fff'
    />
  </svg>
);

const Copy = ({ href }) => {
  if (!ExecutionEnvironment.canUseDOM) return null;
  let form = new FormData();
  form.append('Event', 'Quiz Copy');
  return (
    <Link
      to={href}
      className='button button--primary not-prose'
      style={{ marginBottom: '1rem' }}
      onClick={() => Fetch(form)}
    >
      複製至 Google Forms {GoogleFormsIcon}
    </Link>
  );
};

const quizData = () => {
  if (!ExecutionEnvironment.canUseDOM) return null;
  const { id } = useActiveDocContext().activeDoc;
  const path = `${id.split('/')[0]}/${id.split('/').at(-1)}`;
  return require(`@site/src/Task/${path}`);
};

export const Quiz = ({ data, href, checkAnswer = false }) => (
  <>
    {href && <Copy href={href} />}
    <App questions={data ?? quizData().questions} checkAnswer={checkAnswer} />
  </>
);

export const QuizAnswers = ({ data }) => (
  <Answers questions={data ?? quizData().questions} />
);

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
