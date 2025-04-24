"use client";

import { useState } from 'react';

export default function Quiz({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      if (onComplete) {
        const score = newAnswers.reduce((acc, answer, index) => {
          return acc + (answer === questions[index].correctAnswer ? 1 : 0);
        }, 0);
        onComplete(score / questions.length);
      }
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      {!showResults ? (
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {question.question}
            </h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Quiz Completed!
          </h3>
          <p className="text-gray-600">
            You've completed the quiz. Your results have been recorded.
          </p>
        </div>
      )}
    </div>
  );
}