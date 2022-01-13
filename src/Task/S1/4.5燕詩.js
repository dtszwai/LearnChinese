import React from "react";
import Quiz from '@site/src/components/Quiz/index'

export default function Practice() {
  const questions = [
    {
      questionText: "「卻入空巢裏」中的「卻」是甚麼意思？",
      answerOptions: [
        { answerText: "卻步", isCorrect: false },
        { answerText: "退回", isCorrect: true },
        { answerText: "卻是", isCorrect: false },
        { answerText: "但是", isCorrect: false },
      ],
    },
    {
      questionText: "「嘴爪雖欲敝」中的「欲敝」是甚麼意思？",
      answerOptions: [
        { answerText: "想要遮蔽", isCorrect: false },
        { answerText: "想要放棄", isCorrect: false },
        { answerText: "將要破損", isCorrect: true },
        { answerText: "仍然擔心", isCorrect: false },
      ],
    },
    {
      questionText: "「嘴爪雖欲敝，心力不知疲。」兩句體現了雙燕怎樣的心情？",
      answerOptions: [
        { answerText: "無怨無悔", isCorrect: true },
        { answerText: "擔憂", isCorrect: false },
        { answerText: "惶恐", isCorrect: false },
        { answerText: "快樂", isCorrect: false },
      ],
    },
    {
      questionText: "「須臾十來往」中的「須臾」是甚麼意思？",
      answerOptions: [
        { answerText: "暫時", isCorrect: false },
        { answerText: "雖然", isCorrect: false },
        { answerText: "來回很多次", isCorrect: false },
        { answerText: "極短的時間／一會兒", isCorrect: true },
      ],
    },
    {
      questionText: "「猶恐巢中飢」中「猶恐」是甚麼意思？",
      answerOptions: [
        { answerText: "仍然擔心", isCorrect: true },
        { answerText: "好像恐懼", isCorrect: false },
        { answerText: "仍然恐懼", isCorrect: false },
        { answerText: "好像擔心", isCorrect: false },
      ],
    },
    {
      questionText: "以下哪兩句最能體現雛燕得到很好的照顧？",
      answerOptions: [
        { answerText: "辛勤三十日，母瘦雛漸肥。", isCorrect: true },
        { answerText: "喃喃教言語，一一刷毛衣。", isCorrect: false },
        { answerText: "須臾十來往，猶恐巢中飢。", isCorrect: false },
        { answerText: "嘴爪雖欲敝，心力不知疲。", isCorrect: false },
      ],
    },
    {
      questionText: "以下哪兩句描寫雙燕教養雛燕的內容？",
      answerOptions: [
        { answerText: "一旦羽翼成，引上庭樹枝。", isCorrect: false },
        { answerText: "喃喃教言語，一一刷毛衣。", isCorrect: true },
        { answerText: "嘴爪雖欲敝，心力不知疲。", isCorrect: false },
        { answerText: "舉翅不回顧，隨風四散飛。", isCorrect: false },
      ],
    },
    {
      questionText: "「引上庭樹枝」中的「引」是甚麼意思？",
      answerOptions: [
        { answerText: "指引", isCorrect: false },
        { answerText: "退回", isCorrect: false },
        { answerText: "引領", isCorrect: true },
        { answerText: "引誘", isCorrect: false },
      ],
    },
    {
      questionText: "「舉翅不回顧」中的「顧」是甚麼意思？",
      answerOptions: [
        { answerText: "照顧", isCorrect: false },
        { answerText: "回頭", isCorrect: true },
        { answerText: "觀看", isCorrect: false },
        { answerText: "光顧", isCorrect: false },
      ],
    },
    {
      questionText: "「思爾為雛日」中的「爾」是甚麼意思？",
      answerOptions: [
        { answerText: "了", isCorrect: false },
        { answerText: "牠", isCorrect: false },
        { answerText: "我", isCorrect: false },
        { answerText: "你", isCorrect: true },
      ],
    },
    {
      questionText: "「高飛背母時」中的「背」是甚麼意思？",
      answerOptions: [
        { answerText: "背叛", isCorrect: false },
        { answerText: "背起", isCorrect: false },
        { answerText: "背棄", isCorrect: true },
        { answerText: "背靠", isCorrect: false },
      ],
    },
  ];

  return <Quiz questions={questions} />
} 