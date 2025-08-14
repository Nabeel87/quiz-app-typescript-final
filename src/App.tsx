import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './services/quiz_service';
import { QuizType } from "./Types/quiz_type";
import QuestionCard from './Components/QuestionCard';
import QuizSetup from './Components/QuizSetup';


function App() {

  let [quiz, setQuiz] = useState<QuizType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);

  const [quizStarted, setQuizStarted] = useState(false);
  const [numQuestions, setNumQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState("");

  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleStart = (questions: number, level: string) => {
    setNumQuestions(questions);
    setDifficulty(level);
    setQuizStarted(true);
    console.log('Start quiz with:', questions, level);
    // fetch quiz questions from API here
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const question: QuizType[] = await getQuizDetails(numQuestions, difficulty);
  //     console.log(question);
  //     setQuiz(question);
  //   }
  //   fetchData();
  // }, [numQuestions, difficulty]);
  useEffect(() => {
    async function fetchData() {
      if (numQuestions > 0 && difficulty) {
        try {
          const question: QuizType[] = await getQuizDetails(numQuestions, difficulty);
          if (!Array.isArray(question) || question.length === 0) {
            throw new Error("No quiz data received");
          }
          setQuiz(question);
          console.log(question);
        } catch (error) {
          console.error("Failed to fetch quiz:", error);
        }
      }
    }
    fetchData();
  }, [numQuestions, difficulty]);

  const handleSubmit = (e: React.FormEvent<EventTarget>, selectedAns: string) => {
    e.preventDefault();
    console.log("Selected Answer:", selectedAns);


    // Check if answer is correct
    if (selectedAns === quiz[currentStep].correct_answer) {
      setScore((prev) => prev + 1);
      // console.log("your score is:",score)
    }

    if (currentStep !== quiz.length - 1) {
      setCurrentStep(++currentStep);
      console.log("handle submit section, if:  ", currentStep);
    }
    else {
      // alert("Quiz Done! Your score is: " + score + " / " + quiz.length);
      console.log("handle submit section, else:  ", currentStep);
      setCurrentStep(0);
      setQuizStarted(false);//its set there after quiz score
      setShowResult(true);
    }
  }
  const resetQuiz = () => {
    setQuizStarted(false);
    setShowResult(false);
    setScore(0);
  };

  if (quizStarted && !quiz.length)
    return <h3>loading...</h3>

  return (
    <div className="App">

      {/* {!showResult ?
        (
          !quizStarted ? (
            <QuizSetup onStart={handleStart} />
          ) : (
            <QuestionCard
              options={quiz[currentStep].option}
              question={quiz[currentStep].question}
              callback={handleSubmit}
            />
          )
        ) : (
          <div className="result-box">
            <h2>🎯 Quiz Finished!</h2>
            <p>Your Score: <strong>{score}</strong> / {quiz.length}</p>
            <button onClick={resetQuiz}>Try Again</button>
          </div>
        )} */}

      {!quizStarted && !showResult && (
        <QuizSetup onStart={handleStart} />
      )}
      {quizStarted && !showResult && (
        <QuestionCard
          options={quiz[currentStep].option}
          question={quiz[currentStep].question}
          callback={handleSubmit}
        />
      )}
      {showResult && (
        <div className="result-box">
          <h2>🎯 Quiz Finished!</h2>
          <p>Your Score: <strong>{score}</strong> / {quiz.length}</p>
          <button onClick={resetQuiz}>Try Again</button>
          <small className="credits">Created by Muhammad Nabil</small>
        </div>
      )}



    </div>
  );
}

export default App;
