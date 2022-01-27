import React, { useState, useEffect } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Game from './Game'
import QuestionBank from './QuestionBank'

export default function Quiz({ questions }) {
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  return (
    <Tabs>
      <TabItem value="Game" label="開始評估" default>
        <Game questions={questions} onAnswerSelect={setSelectedAnswer} />
      </TabItem>
      <TabItem value="QuestionBank" label="題目庫">
        <QuestionBank questions={questions} selectedAnswer={selectedAnswer} />
      </TabItem>
    </Tabs>
  );
}
