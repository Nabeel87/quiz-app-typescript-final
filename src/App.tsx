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

  const handleStart = (questions: number, level: string) => {
    setNumQuestions(questions);
    setDifficulty(level);
    setQuizStarted(true);
    console.log('Start quiz with:', questions, level);
    // fetch quiz questions from API here
  };

  useEffect(() => {
    async function fetchData() {
      const question: QuizType[] = await getQuizDetails(numQuestions, difficulty);
      console.log(question);
      setQuiz(question);
    }
    fetchData();
  }, [numQuestions, difficulty]);

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);
    else {
      alert("Quiz Done")
      setCurrentStep(0);
    }
  }

  if (quizStarted && !quiz.length)
    return <h3>loading...</h3>

  return (
    <div className="App">

      {!quizStarted ? (
        <QuizSetup onStart={handleStart} />
      ) : (
        <QuestionCard
          options={quiz[currentStep].option}
          question={quiz[currentStep].question}
          callback={handleSubmit}
        />
      )}



    </div>
  );
}

export default App;
