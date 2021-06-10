import React from 'react';
// Types 
import { AnswerObject } from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions,
}) => (
    <div className="question">
        <div className="question-number">Question: {questionNumber} / {totalQuestions} </div>
        <div dangerouslySetInnerHTML={{ __html: question }} />
        <div className="question-answers">
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);
export default QuestionCard;