// src/components/QuizSetup.tsx
import React, { useState } from 'react';

type QuizSetupProps = {
  onStart: (numQuestions: number, difficulty: string) => void;
};

const QuizSetup: React.FC<QuizSetupProps> = ({ onStart }) => {
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(numQuestions, difficulty);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Quiz Setup</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Number of Questions</label>
        <input
          type="number"
          min={1}
          max={50}
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start Quiz
      </button>
    </form>
  );
};

export default QuizSetup;
