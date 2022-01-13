import React from "react";
import styles from './QuestionBank.module.scss'

export default function QuestionBank({ questions }) {
  return questions.map((question, i) => (
    <div className={styles.Block} key={i}>
      {/* Question 題目 */}
      <div className={styles.QuestionSection}>
        {`${i + 1}. ${question.questionText}`}
      </div>
      {/* Answer 答案 */}
      <div className={styles.AnswerSection}>
        {/* Display All options */}
        {question.answerOptions.map((option, i) =>
          <p
            key={i}
            // Emphasis the line of the Correct Answer
            className={option.isCorrect ? styles.CorrectAnswer : ""}
          >
            <span className={!option.isCorrect ? styles.Options : ""}>
              {/* Answer Options: 0-4 -> A-D */}
              {`${String.fromCharCode(i + 65)}. `}
            </span>
            {`${option.answerText} `}
            {/* Mark Answer as Correct */}
            {option.isCorrect && <span className={styles.Comment}>// 正確答案</span>}
          </p>
        )}
      </div>
    </div>
  ));
}