import React from "react";
import styles from './QuestionBank.module.scss'

export default function QuestionBank({ data, selectedAnswer }) {
  const { questions } = data;

  const renderedMessage = (option, questionKey, answerKey) => {
    let message = '';

    if (option.isCorrect) {
      if (selectedAnswer[questionKey] === undefined) {
        message = '// 正確答案';
      } else if (selectedAnswer[questionKey] !== answerKey) {
        message = '⭕️ 正確答案';
      } else if (selectedAnswer[questionKey] === answerKey) {
        message = '✔️ 回答正確'
      }
    } else if (selectedAnswer[questionKey] === answerKey) {
      message = '❌ 你的選擇';
    }

    return <span className={styles.Comment}>{message}</span>
  };

  return (
    <>
      {questions.map((question, questionKey) => (
        <div className={styles.Block} key={questionKey}>
          {/* Question 題目 */}
          <div className={styles.QuestionSection}>
            {`${questionKey + 1}. ${question.questionText}`}
          </div>

          {/* Answer 答案 */}
          <div className={styles.AnswerSection}>
            {question.answerOptions.map((option, answerKey) =>
              <p
                key={answerKey}
                className={option.isCorrect ? styles.CorrectAnswer : null}
              >
                <span className={option.isCorrect ? null : styles.Options}>
                  {String.fromCharCode(answerKey + 65)}.&nbsp;
                </span>
                {option.answerText}&nbsp;{renderedMessage(option, questionKey, answerKey)}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}