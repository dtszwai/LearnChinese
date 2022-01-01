import React, { useState } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

const questions = [
  {
    questionText: "〈虞美人〉是一首描述什麼的詞？",
    answerOptions: [
      { answerText: "悼亡詞", isCorrect: false },
      { answerText: "抒情詞", isCorrect: true },
      { answerText: "懷古詞", isCorrect: false },
      { answerText: "詠物詞", isCorrect: false },
    ],
  },
  {
    questionText: "以下哪項是這首詞的情調？",
    answerOptions: [
      { answerText: "平淡", isCorrect: false },
      { answerText: "豪放", isCorrect: false },
      { answerText: "悲痛", isCorrect: true },
      { answerText: "輕鬆", isCorrect: false },
    ],
  },
  {
    questionText: "以下哪項不是詞作的內容？",
    answerOptions: [
      { answerText: "故國之思", isCorrect: false },
      { answerText: "及時行樂", isCorrect: true },
      { answerText: "物是人非", isCorrect: false },
      { answerText: "亡國之痛", isCorrect: false },
    ],
  },
  {
    questionText: "作者寫本詞時，是身處在什麼境況下？",
    answerOptions: [
      { answerText: "被人軟禁", isCorrect: true },
      { answerText: "身陷天牢", isCorrect: false },
      { answerText: "離鄉背井", isCorrect: false },
      { answerText: "遊山玩水", isCorrect: false },
    ],
  },
  {
    questionText: "「雕欄玉砌」這一意象指的是什麼？",
    answerOptions: [
      { answerText: "寺廟的欄杆", isCorrect: false },
      { answerText: "南唐的宮殿", isCorrect: true },
      { answerText: "江南的園林", isCorrect: false },
      { answerText: "作者被囚禁的地方", isCorrect: false },
    ],
  },
  {
    questionText: "「小樓昨夜又東風」中的「小樓」指的是？",
    answerOptions: [
      { answerText: "寺廟", isCorrect: false },
      { answerText: "南唐的宮殿", isCorrect: false },
      { answerText: "江南的園林", isCorrect: false },
      { answerText: "作者被囚禁的地方", isCorrect: true },
    ],
  },
  {
    questionText: "「小樓昨夜又東風」中的「東風」指的是？",
    answerOptions: [
      { answerText: "春天的風", isCorrect: true },
      { answerText: "夏天的風", isCorrect: false },
      { answerText: "秋天的風", isCorrect: false },
      { answerText: "冬天的風", isCorrect: false },
    ],
  },
  {
    questionText:
      "「問君能有幾多愁，恰似一江春水向東流。」以下哪項不是本句所運用的修辭手法？",
    answerOptions: [
      { answerText: "誇張", isCorrect: false },
      { answerText: "比喻", isCorrect: false },
      { answerText: "對偶", isCorrect: true },
      { answerText: "設問", isCorrect: false },
    ],
  },
];

const taskList = questions.map((item, itemindex) => (
  <div className="task-list-block" key={"questions" + itemindex}>
    <div className="question-section">
      {`${itemindex + 1}. ${item.questionText}`}
    </div>
    <div className="answer-section">
      <pre>
        <code>
          {item.answerOptions.map((sub, subindex) => (
            <p
              key={"sub" + subindex}
              className={sub.isCorrect ? "correct-answer" : ""}
            >
              <span className="option">
                {`${String.fromCharCode(subindex + 65)}. `}
              </span>
              {`${sub.answerText} `}
              {sub.isCorrect && <span className="comment">// 正確答案</span>}
            </p>
          ))}
        </code>
      </pre>
    </div>
  </div>
));

function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length
      ? setCurrentQuestion(nextQuestion)
      : setShowScore(true);
  };
  const resetForm = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
  };
  return (
    <div className="task-game">
      {showScore ? (
        <div className="score-section">
          你在 {questions.length} 題裏答對了 {score} 題。
          <button onClick={resetForm}>再做一次</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>
                第 {currentQuestion + 1}/{questions.length} 題
              </span>
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, key) => (
                <button
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                  key={key}
                >
                  {String.fromCharCode(key + 65)}. {answerOption.answerText}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function Task() {
  return (
    <Tabs>
      <TabItem value="game" label="開始評估" default>
        <Game />
      </TabItem>
      <TabItem value="taskList" label="題目庫">
        {taskList}
      </TabItem>
    </Tabs>
  );
}
