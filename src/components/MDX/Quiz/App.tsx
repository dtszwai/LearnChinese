import React, { useEffect, useState, useContext } from 'react';
import styles from './styles.module.scss';
import { Question, Selection, WrongAnswer } from './utils';
import { QuizContext } from '@site/src/theme/Root';
import Fetch from '../../Fetch';

export default ({ questions, checkAnswer = false }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { setSelectedAnswer, result, setResult } = useContext(QuizContext);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (showScore) {
      let formData = new FormData();
      formData.append('Event', 'Quiz');
      formData.append('Details', WrongAnswer(result));
      formData.append('Message', `分數：${score}/${questions.length}`);
      Fetch(formData);
    }
  }, [showScore]);

  const handleAnswerOptionClick = (i: number) => {
    const isCorrect = !!questions[currentQuestion].answerOptions[i].isCorrect;
    setScore((prep) => prep + (isCorrect ? 1 : 0));
    setSelectedAnswer((prep) => ({ ...prep, [currentQuestion]: i }));
    setResult((prep) => [...prep, isCorrect]);
    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length ? setCurrentQuestion(nextQuestion) : setShowScore(true);
  };

  const reset = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setResult([]);
    setSelectedAnswer({});
  };

  return (
    <div className={styles.Quiz}>
      {showScore ? (
        <div className={styles.Score}>
          <p>
            你在&nbsp;
            <span style={{ color: '#8783D1' }}>{questions.length}</span>
            &nbsp;題裏答對了&nbsp;
            <span style={{ color: '#E27396' }}>{score}</span>
            &nbsp;題。
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
