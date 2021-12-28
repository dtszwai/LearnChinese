import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const questions = [
    {
        questionText: '此詞描寫的是甚麼節日？',
        answerOptions: [
            { answerText: '春節', isCorrect: false },
            { answerText: '元宵節', isCorrect: false },
            { answerText: '中秋節', isCorrect: true },
            { answerText: '冬至', isCorrect: false },
        ],
    },
    {
        questionText: '以下哪項不是詞作的內容？',
        answerOptions: [
            { answerText: '思念弟弟', isCorrect: false },
            { answerText: '人間離別', isCorrect: false },
            { answerText: '異地戀愛', isCorrect: true },
            { answerText: '思想的矛盾', isCorrect: false },
        ],
    },
    {
        questionText: '「人有悲歡離合，月有陰晴圓缺，此事古難全」運用了甚麼寫作手法？',
        answerOptions: [
            { answerText: '誇張', isCorrect: false },
            { answerText: '情景交融', isCorrect: true },
            { answerText: '先抑後揚', isCorrect: false },
            { answerText: '借古諷今', isCorrect: false },
        ],
    },
    {
        questionText: '以下哪項不是本詞的寫作特色？',
        answerOptions: [
            { answerText: '擬物手法', isCorrect: true },
            { answerText: '結構嚴謹', isCorrect: false },
            { answerText: '融化詩句', isCorrect: false },
            { answerText: '浪漫的想像', isCorrect: false },
        ],
    },
];

const taskList = questions.map((item, itemindex) => (
    <div className="task-list-block" key={'questions' + itemindex}>
        <div className="question-section">
            {itemindex + 1 + '. '}{item.questionText}
        </div>

        <div className="answer-section">
            <pre>
                <code>
                    {item.answerOptions.map((sub, subindex) =>
                        <React.Fragment key={'sub' + subindex} >
                            <p className={sub.isCorrect ? "correct-answer" : ""}>
                                <span className="option">{String.fromCharCode(subindex + 65)}. </span>
                                {sub.answerText} {sub.isCorrect && <span className="comment">// 正確</span>}
                            </p>
                        </React.Fragment>
                    )}
                </code>
            </pre>
        </div>
    </div >
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
        (nextQuestion < questions.length) ? setCurrentQuestion(nextQuestion) : setShowScore(true);

    };
    const resetForm = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
    };
    return (
        <div className="task-game">
            {showScore ? (
                <>
                    <div className='score-section'>
                        你在 {questions.length} 題裏答對了 {score} 題。
                        <button onClick={resetForm}>再做一次</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>第 {currentQuestion + 1}/{questions.length} 題</span>
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, key) => (
                            <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} key={key}>{answerOption.answerText}</button>
                        ))}
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