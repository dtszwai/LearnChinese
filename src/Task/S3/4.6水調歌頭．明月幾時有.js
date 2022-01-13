import React from "react";
import Quiz from '@site/src/components/Quiz/index'

export default function Practice() {
  const questions = [
    {
      questionText: "蘇軾於〈水調歌頭〉中加入了詞序。請問詞序有何功用？",
      answerOptions: [
        { answerText: "闡明文章主題", isCorrect: false },
        { answerText: "交代自己的身份", isCorrect: false },
        { answerText: "指出寫作前的經歷", isCorrect: false },
        { answerText: "交代詞作的寫作背景", isCorrect: true },
      ],
    },
    {
      questionText: "此詞描寫的是甚麼節日？",
      answerOptions: [
        { answerText: "春節", isCorrect: false },
        { answerText: "元宵節", isCorrect: false },
        { answerText: "中秋節", isCorrect: true },
        { answerText: "冬至", isCorrect: false },
      ],
    },
    {
      questionText: "「天上宮闕」除了指天宮以外，還隱含了甚麼意思？",
      answerOptions: [
        { answerText: "家庭", isCorrect: false },
        { answerText: "朝廷", isCorrect: true },
        { answerText: "故鄉眉州", isCorrect: false },
        { answerText: "美人住處", isCorrect: false },
      ],
    },
    {
      questionText: "「瓊樓玉宇」指的是甚麼？",
      answerOptions: [
        { answerText: "明指嫦娥，暗指月宮。", isCorrect: false },
        { answerText: "明指朝廷，暗指月宮。", isCorrect: false },
        { answerText: "明指月宮，暗指朝廷。", isCorrect: true },
        { answerText: "明指宫殿，暗指昔日美好的生活。", isCorrect: false },
      ],
    },
    {
      questionText:
        "「人有悲歡離合，月有陰晴圓缺，此事古難全」運用了甚麼寫作手法？",
      answerOptions: [
        { answerText: "誇張", isCorrect: false },
        { answerText: "情景交融", isCorrect: true },
        { answerText: "先抑後揚", isCorrect: false },
        { answerText: "借古諷今", isCorrect: false },
      ],
    },
    {
      questionText: "「此事古難全」的全字是什麼意思？",
      answerOptions: [
        { answerText: "存在", isCorrect: false },
        { answerText: "圓滿", isCorrect: true },
        { answerText: "保存", isCorrect: false },
        { answerText: "成全", isCorrect: false },
      ],
    },
    {
      questionText: "以下哪項不是詞作的內容？",
      answerOptions: [
        { answerText: "異地戀愛", isCorrect: true },
        { answerText: "思念弟弟", isCorrect: false },
        { answerText: "人間離別", isCorrect: false },
        { answerText: "思想的矛盾", isCorrect: false },
      ],
    },
    {
      questionText: "以下哪項不是本詞的寫作特色？",
      answerOptions: [
        { answerText: "擬物手法", isCorrect: true },
        { answerText: "結構嚴謹", isCorrect: false },
        { answerText: "融化詩句", isCorrect: false },
        { answerText: "浪漫的想像", isCorrect: false },
      ],
    },
  ];

  return <Quiz questions={questions} />
} 