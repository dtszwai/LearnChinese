import React, { useState } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Game from './Game'
import QuestionBank from './QuestionBank'

export default function Quiz({ questions }) {
  const [selectedAnswer, setSelectedAnswer] = useState({});

  return (
    <Tabs>
      <TabItem value="開始評估" default>
        <Game {...{ questions, setSelectedAnswer }} />
      </TabItem>
      <TabItem value="題目庫">
        <QuestionBank {...{ questions, selectedAnswer }} />
      </TabItem>
    </Tabs>
  );
}
