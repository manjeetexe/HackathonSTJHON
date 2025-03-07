import React from 'react';
import Questionnaire from '../Components/Questionnaire';

const questions = [
  { index: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], correctAnswerIndex: 0 },
  { index: 2, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswerIndex: 1 },
  { index: 3, question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswerIndex: 1 },
  { index: 4, question: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correctAnswerIndex: 3 },
  { index: 5, question: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'], correctAnswerIndex: 0 }
];

const Test = () => {
  return (
    <>
      <div className='flex flex-col justify-between bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 p-8'>
        <h1 className='text-black text-7xl'> Test </h1>
        <h2 className='text-black text-2xl pt-5'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia veniam suscipit commodi atque doloribus sequi fugit blanditiis hic corporis.
        </h2>
        <div>
          <Questionnaire questions={questions} />
        </div>
      </div>
    </>
  );
};

export default Test;