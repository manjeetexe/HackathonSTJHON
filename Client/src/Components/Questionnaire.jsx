import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Questionnaire = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const results = questions.map((question, index) => ({
      question: question.question,
      selectedAnswer: question.options[answers[index]],
      correctAnswer: question.options[question.correctAnswerIndex]
    }));
    console.log('Results:', results);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center bg-transparent min-h-screen p-6">
      <div className="bg-white rounded-4xl shadow-xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {currentQuestion.index}. {currentQuestion.question}
        </h2>

        <ul className="text-lg text-gray-700 space-y-4">
          {currentQuestion.options.map((option, index) => (
            <li
              className={`py-2 px-4 rounded-md border border-gray-300 hover:bg-blue-50 cursor-pointer ${
                answers[currentQuestionIndex] === index ? 'bg-blue-100' : ''
              }`}
              key={index}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 text-xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          >
            Previous
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-xl font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-6 py-2 text-xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Questionnaire.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswerIndex: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Questionnaire;