import React from "react";
import styles from './QuestionBank.module.scss'

export default function QuestionBank({ data, selectedAnswer }) {
  const { questions } = data;
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
                className={option.isCorrect && styles.CorrectAnswer}
              >
                <span className={!option.isCorrect ? styles.Options : ""}>
                  {`${String.fromCharCode(answerKey + 65)}. `}
                </span>
                {`${option.answerText} `}
                {!option.isCorrect && selectedAnswer[questionKey] === answerKey && <span className={styles.Comment}>❌ 你的選擇</span>}
                {option.isCorrect && selectedAnswer[questionKey] !== answerKey && selectedAnswer[questionKey] !== undefined && <span className={styles.Comment}>⭕️ 正確答案</span>}
                {option.isCorrect && selectedAnswer[questionKey] === undefined && <span className={styles.Comment}>// 正確答案</span>}
                {option.isCorrect && selectedAnswer[questionKey] === answerKey && <span className={styles.Comment}>✔️ 回答正確</span>}
              </p>
            )}
          </div>
        </div>
      ))
      }
    </>
  );
}