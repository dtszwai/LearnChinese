import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Game from './Game';
import QuestionBank from './QuestionBank';
import Copy from './Copy';

export default function Quiz({ data, href }) {
  const [selectedAnswer, setSelectedAnswer] = useState<{
    [key: number]: number;
  }>({});
  const [result, setResult] = useState<boolean[]>([]);

  return (
    <Tabs>
      <TabItem
        value='開始評估'
        default
        attributes={{ 'data-quiz': 'Questions' }}
      >
        {href && <Copy href={href} />}
        <Game {...{ data, setSelectedAnswer, result, setResult }} />
      </TabItem>
      <TabItem value='題目庫' attributes={{ 'data-quiz': 'Answers' }}>
        <QuestionBank
          {...{ selectedAnswer, result }}
          questions={data.questions}
        />
      </TabItem>
    </Tabs>
  );
}
