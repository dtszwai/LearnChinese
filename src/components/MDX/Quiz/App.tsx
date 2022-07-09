import React, { useEffect, useState, useContext } from 'react';
import styles from './styles.module.scss';
import { Question, Selection, WrongAnswer } from './utils';
import { QuizContext } from '@site/src/theme/Root';
import postData from '@site/src/utils/postData';

export default ({ questions, checkAnswer = false }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { setSelectedAnswer, result, setResult } = useContext(QuizContext);

  const reset = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setResult([]);
    setSelectedAnswer({});
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (showScore)
      postData({ Event: 'Quiz', Details: WrongAnswer(result), Message: `分數：${score}/${questions.length}` });
  }, [showScore]);

  const handleAnswerOptionClick = (i: number) => {
    const isCorrect = questions[currentQuestion].answerOptions[i].isCorrect;
    setScore((prep) => prep + (isCorrect ? 1 : 0));
    setSelectedAnswer((prep) => ({ ...prep, [currentQuestion]: i }));
    setResult((prep) => [...prep, isCorrect]);
    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length ? setCurrentQuestion(nextQuestion) : setShowScore(true);
  };

  return (
    <div className={styles.Quiz}>
      {showScore ? (
        <div className={styles.Score}>
          <p>
            你在
            <span style={{ color: '#8783D1' }}> {questions.length} </span>
            題裏答對了
            <span style={{ color: '#E27396' }}> {score} </span>
            題。
          </p>
          <p>{WrongAnswer(result)}</p>
          <button className={styles.btn} onClick={reset} children='再做一次' />
          {checkAnswer && (
            <button
              className={styles.btn}
              onClick={() => {
                document.querySelector<HTMLElement>('[data-quiz="Answers"]').click();
              }}
              children='查看答案'
            />
          )}
        </div>
      ) : (
        <>
          <Question
            header={`第 ${currentQuestion + 1}/${questions.length} 題`}
            text={questions[currentQuestion].questionText}
          />
          <Selection
            options={questions[currentQuestion].answerOptions.map((option) => option.answerText)}
            onSelect={handleAnswerOptionClick}
          />
        </>
      )}
    </div>
  );
};
