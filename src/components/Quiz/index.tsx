import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Game from './Game';
import QuestionBank from './QuestionBank';
import Link from '@docusaurus/Link';

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

export default function Quiz({ data, href }) {
  const [selectedAnswer, setSelectedAnswer] = useState<{
    [key: number]: number;
  }>({});
  const [result, setResult] = useState<boolean[]>([]);

  return (
    <Tabs>
      <TabItem value='開始評估' default>
        {href && (
          <Link
            to={href}
            className='button button--primary not-prose'
            style={{ marginBottom: '1rem' }}
          >
            複製至 Google Forms {GoogleFormsIcon}
          </Link>
        )}
        <Game {...{ data, setSelectedAnswer, result, setResult }} />
      </TabItem>
      <TabItem value='題目庫'>
        <QuestionBank
          {...{ selectedAnswer, result }}
          questions={data.questions}
        />
      </TabItem>
    </Tabs>
  );
}
