import React from 'react';
// Types 
import { AnswerObject } from '../App'
import { CardWrapper, ButtonWrapper } from './QuestionCard.styles';

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
    <CardWrapper>
        <div className="question-number">Question: {questionNumber} / {totalQuestions} </div>
        <div className="question" dangerouslySetInnerHTML={{ __html: question }} />
        <div className="question-answers">
            {answers.map(answer => (
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.userAnswer === answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </CardWrapper>
);
export default QuestionCard;