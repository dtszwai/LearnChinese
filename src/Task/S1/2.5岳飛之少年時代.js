import React from "react";
import Quiz from '@site/src/components/Quiz/index'

export default function Practice() {
    const questions = [
        {
            questionText: '作者在文章開首記敘了有關岳飛的哪件事？',
            answerOptions: [
                { answerText: '父親對岳飛的鼓勵', isCorrect: false },
                { answerText: '學周同學射箭', isCorrect: false },
                { answerText: '出生時的情況', isCorrect: true },
                { answerText: '周同去世', isCorrect: false },
            ],
        },
        {
            questionText: '文中說岳飛「未彌月，河決內黃，水暴至」，「彌月」的意思是：',
            answerOptions: [
                { answerText: '小孩出生一百天', isCorrect: false },
                { answerText: '小孩滿一個月大', isCorrect: true },
                { answerText: '小孩尚有一個月便出生', isCorrect: false },
                { answerText: '小孩滿一歲大', isCorrect: false },
            ],
        },
        {
            questionText: '文中指岳飛「家貧，拾薪為燭，誦習達旦，不寐」，「寐」的意思是：',
            answerOptions: [
                { answerText: '睡覺', isCorrect: true },
                { answerText: '休息', isCorrect: false },
                { answerText: '吃飯', isCorrect: false },
                { answerText: '洗澡', isCorrect: false },
            ],
        },
        {
            questionText: '文中指岳飛「家貧，拾薪為燭，誦習達旦，不寐」，可反映岳飛的甚麼特質？',
            answerOptions: [
                { answerText: '孝順', isCorrect: false },
                { answerText: '勤奮好學', isCorrect: true },
                { answerText: '天資聰敏', isCorrect: false },
                { answerText: '尊師重道', isCorrect: false },
            ],
        },
        {
            questionText: '文中說岳飛「生有神力，未冠，能挽弓三百斤」，「未冠」意指：',
            answerOptions: [
                { answerText: '沒有戴帽子', isCorrect: false },
                { answerText: '未有做官', isCorrect: false },
                { answerText: '年齡未足二十歲', isCorrect: true },
                { answerText: '射箭沒有獲冠軍', isCorrect: false },
            ],
        }, {
            questionText: '文中說岳飛「生有神力，未冠，能挽弓三百斤」，反映了岳飛具備了甚麼特質？',
            answerOptions: [
                { answerText: '力大無窮', isCorrect: true },
                { answerText: '孝順', isCorrect: false },
                { answerText: '精忠報國', isCorrect: false },
                { answerText: '尊師重道', isCorrect: false },
            ],
        }, {
            questionText: '文中周同「射三矢，皆中的」，「的」的意思是：',
            answerOptions: [
                { answerText: '結構助詞', isCorrect: false },
                { answerText: '名詞，箭靶中心', isCorrect: true },
                { answerText: '副詞，真、實在', isCorrect: false },
                { answerText: '句末助詞', isCorrect: false },
            ],
        }, {
            questionText: '文中說岳飛「由是益自練習」，「益」的意思是：',
            answerOptions: [
                { answerText: '更加', isCorrect: true },
                { answerText: '益處', isCorrect: false },
                { answerText: '有益', isCorrect: false },
                { answerText: '益菌', isCorrect: false },
            ],
        }, {
            questionText: '周同死後，岳飛十分難過。每月初一、十五都會拜祭恩師，並用恩師所贈的弓發三箭，以示不忘師恩。這反映了岳飛的甚麼特質？',
            answerOptions: [
                { answerText: '孝順', isCorrect: false },
                { answerText: '尊師重道', isCorrect: true },
                { answerText: '忠心', isCorrect: false },
                { answerText: '勤奮好學', isCorrect: false },
            ],
        }, {
            questionText: '岳飛得到父親的允許才以身報國，反映了他怎樣的特質？',
            answerOptions: [
                { answerText: '盡忠職守', isCorrect: false },
                { answerText: '誠實', isCorrect: false },
                { answerText: '未雨綢繆', isCorrect: false },
                { answerText: '孝順', isCorrect: true },
            ],
        },
    ];
    return <Quiz questions={questions} />
}