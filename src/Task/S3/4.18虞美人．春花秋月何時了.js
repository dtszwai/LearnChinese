import React from "react";
import Quiz from '@site/src/components/Quiz/index'

export default function Practice() {
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

  return <Quiz questions={questions} />
} 