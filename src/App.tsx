import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// styles 
import { GlobalStyle, Wrapper } from './App.styles';

// Components 
import QuestionCard from './components/QuestionCard';
// Types 
import { QuestionState, Difficulty } from './API';
import Logo from './images/rolling-dices.svg'

export type AnswerObject = {
  question: string;
  userAnswer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {
  const [isLoading, setIsLoading ] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const TOTAL_QUESTIONS = 10;

  const startTrivia = async () => {
    setIsLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setIsLastQuestion(false)
    setIsLoading(false)
  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
if (!gameOver) {
  // get user answers
  const userAnswer = e.currentTarget.value;
  // check if correct or wrong
  const correct = questions[questionNumber].correct_answer === userAnswer;
  // add score if answer is correct
  if (correct) setScore(prev => prev + 1);
  // save answer in the array for user answers 
  const answerObject = {
    question: questions[questionNumber].question,
    userAnswer,
    correct,
    correctAnswer: questions[questionNumber].correct_answer,
  }
  setUserAnswers((prev) => [...prev, answerObject]);
}
  }

  const nextQuestion = () => {
    // move on to the next / last question 
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS - 1) {
      setIsLastQuestion(true);
      setQuestionNumber(nextQuestion)
    } else if (nextQuestion === TOTAL_QUESTIONS) {
      setIsLastQuestion(false);
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion)
    }
  }


  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <header>
        <img src={Logo} alt="logo"/>
        <h1>THE FINAL QUIZ</h1>
        {gameOver ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver && userAnswers.length !== questionNumber + 1 ? (
          <div className="score">Score: {score}</div>
        ) : null}
        {isLastQuestion && userAnswers.length === questionNumber + 1 ? (
          <div className="score">Final score: {score}</div>
        ) : null}
        {isLoading ? (
          <small className="loading">Loading questions...</small>
        ) : null}
         {isLastQuestion && userAnswers.length !== questionNumber + 1? (
          <div className="question-last">This is the final one, hope you know it!</div>
        ) : null}
        {!isLoading && !gameOver && (
          <QuestionCard 
            questionNumber={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !isLoading && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next question
          </button>
        ) : null}
            {userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Try again
          </button>
        ) : null}
      </header>
    </Wrapper>
    <small className="copyright">App created by <a target="_blank" rel="nofollow noreferrer" href="https://www.manu-sanchez.com"> Manu Sánchez </a> on a random evening</small>
  </>
  );
}

export default App;
