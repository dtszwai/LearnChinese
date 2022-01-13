import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Game from './Game'
import QuestionBank from './QuestionBank'

export default function Quiz({ questions }) {
  return (
    <Tabs>
      <TabItem value="Game" label="開始評估" default>
        <Game questions={questions}/>
      </TabItem>
      <TabItem value="QuestionBank" label="題目庫">
        <QuestionBank questions={questions} />
      </TabItem>
    </Tabs>
  );
}
