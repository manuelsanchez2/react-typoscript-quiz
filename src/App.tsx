import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

// Components 
import QuestionCard from './components/QuestionCard';
// Types 
import { QuestionState, Difficulty } from './API';

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
    <div className="App">
      <header className="App-header">
        <h1>REACT QUIZZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? (
          <div className="score">Score: </div>
        ) : null}
        {isLoading ? (
          <small>Loading questions...</small>
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
        {isLastQuestion ? (
          <div>This is the final one, hope you know it!</div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
