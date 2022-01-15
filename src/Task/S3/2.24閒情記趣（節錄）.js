import React from "react";
import Quiz from '@site/src/components/Quiz/index'

export default function Practice() {
  const questions = [
    {
      questionText: "〈閒情記趣〉的作者是誰？",
      answerOptions: [
        { answerText: "沈括", isCorrect: false },
        { answerText: "沈複", isCorrect: false },
        { answerText: "沈復", isCorrect: true },
        { answerText: "沈覆", isCorrect: false },
      ],
    },
    {
      questionText: "何謂「閒情」？",
      answerOptions: [
        { answerText: "在無聊時間的情感", isCorrect: false },
        { answerText: "在退休時的悠閒情感", isCorrect: false },
        { answerText: "在失業時的悠閒情感", isCorrect: false },
        { answerText: "在空閒、悠閒時間的情感", isCorrect: true },
      ],
    },
    {
      questionText: "何謂「記趣」？",
      answerOptions: [
        { answerText: "記敍有趣的事件", isCorrect: true },
        { answerText: "記敍沒趣的事件", isCorrect: false },
        { answerText: "記下朋友有趣的事件", isCorrect: false },
        { answerText: "記敍家人有趣的事件", isCorrect: false },
      ],
    },
    {
      questionText: "作者透過敍述童年時從觀察微小事物得到「物外之趣」的生活片段，說明了他敏銳的_____和豐富的_____。",
      answerOptions: [
        { answerText: "歡察力；想像力", isCorrect: false },
        { answerText: "觀察力；想像力", isCorrect: true },
        { answerText: "觀察力；相像力", isCorrect: false },
        { answerText: "勸察力；想像力", isCorrect: false },
      ],
    },
    {
      questionText: "〈閒情記趣〉的文學體裁是？",
      answerOptions: [
        { answerText: "唐詩", isCorrect: false },
        { answerText: "宋詞", isCorrect: false },
        { answerText: "小說", isCorrect: false },
        { answerText: "散文", isCorrect: true },
      ],
    },
    {
      questionText:
        "〈閒情記趣〉使用了哪一種記敘方法？",
      answerOptions: [
        { answerText: "順敘法", isCorrect: false },
        { answerText: "倒敘法", isCorrect: false },
        { answerText: "散敘法", isCorrect: true },
        { answerText: "插敘法", isCorrect: false },
      ],
    },
    {
      questionText: "下列哪項不是沈復記錄的三件趣事之一。",
      answerOptions: [
        { answerText: "小溪釣魚", isCorrect: true },
        { answerText: "神遊山林", isCorrect: false },
        { answerText: "觀蚊成鶴", isCorrect: false },
        { answerText: "鞭蛤蟆觀蟲鬥", isCorrect: false },
      ],
    },
    {
      questionText: "本文出自哪本散文集？",
      answerOptions: [
        { answerText: "《浮生四季》", isCorrect: false },
        { answerText: "《浮生六記》", isCorrect: true },
        { answerText: "《人生六記》", isCorrect: false },
        { answerText: "《幹校六記》", isCorrect: false },
      ],
    },
  ];

  return <Quiz questions={questions} />
} 