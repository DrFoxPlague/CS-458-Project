import React, { useState } from 'react';
import logo from './cits-logo.png';

export const TestGame = () => {
  // Set the selectedSubject type to be a key of subjects
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof subjects | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);
  const [isAnsweringDisabled, setIsAnsweringDisabled] = useState(false);

  const handleSubjectSelect = (subject: keyof typeof subjects) => {
    setSelectedSubject(subject);
    setQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (answer: string) => {
    setIsAnsweringDisabled(true);
    const currentQuestion = subjects[selectedSubject!][questionIndex];
    if (answer === currentQuestion.correct) {
      setFeedback("Correct!");
      setFeedbackType('correct');
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback(`Wrong! The correct answer was: ${currentQuestion.correct}`);
      setFeedbackType('wrong');
    }
    setTimeout(() => {
      setFeedback(null);
      setFeedbackType(null);
      setIsAnsweringDisabled(false);
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }, 2000); // Show feedback for 2 seconds
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="CITS Logo" className="logo" />
      </div>
      {selectedSubject && questionIndex < subjects[selectedSubject].length ? (
        <div className="quiz">
          <h2>{selectedSubject} Quiz</h2>
          <p>{subjects[selectedSubject][questionIndex].question}</p>
          {feedback && (
            <p className={`feedback ${feedbackType}`}>{feedback}</p>
          )}
          <div className="options">
            {subjects[selectedSubject][questionIndex].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={isAnsweringDisabled}
              >
                {option}
              </button>
            ))}
          </div>
          <p>Your score: {score}</p>
        </div>
      ) : selectedSubject && questionIndex >= subjects[selectedSubject].length ? (
        <div className="quiz">
          <h2>Congratulations! You completed the {selectedSubject} Quiz!</h2>
          <p>Your final score: {score}/{subjects[selectedSubject].length}</p>
          <button onClick={() => setSelectedSubject(null)}>Back to Subjects</button>
        </div>
      ) : (
        <div className="subject-selection">
          <h1>Choose a Subject</h1>
          <div className="subject-grid">
            {Object.keys(subjects).map((subject) => (
              <button key={subject} onClick={() => handleSubjectSelect(subject as keyof typeof subjects)}>
                {subject}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Define the subjects type
type Subject = {
  question: string;
  options: string[];
  correct: string;
};

type Subjects = {
  [key: string]: Subject[];
};

// Define the subjects object with specific keys
const subjects: Subjects = {
  Botany: [
    { question: "What is the process by which plants make their own food?", options: ["Photosynthesis", "Respiration", "Osmosis", "Digestion"], correct: "Photosynthesis" },
    { question: "Which part of the plant is responsible for absorbing water and nutrients?", options: ["Leaves", "Stem", "Roots", "Flower"], correct: "Roots" },
    { question: "What is the green pigment in plants called?", options: ["Chlorophyll", "Carotene", "Xanthophyll", "Anthocyanin"], correct: "Chlorophyll" },
  ],
  Zoology: [
    { question: "What is the largest land animal?", options: ["Elephant", "Lion", "Giraffe", "Rhinoceros"], correct: "Elephant" },
    { question: "Which animal is known as king of the jungle?", options: ["Tiger", "Elephant", "Lion", "Bear"], correct: "Tiger" },
    { question: "What is a group of lions called?", options: ["Herd", "Pack", "Pride", "Swarm"], correct: "Pride" },
  ],
  Geology: [
    { question: "What type of rock is formed by lava?", options: ["Igneous", "Sedimentary", "Metamorphic", "Limestone"], correct: "Igneous" },
    { question: "What is the hardest mineral on the Moh's scale?", options: ["Quartz", "Topaz", "Diamond", "Corundum"], correct: "Diamond" },
    { question: "What layer of earth is liquid?", options: ["Inner Core", "Outer Core", "Mantle", "Crust"], correct: "Outer Core" },
  ],
  ComputerScience: [
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Processing Unit", "Central Process Unit", "Control Processing Unit"], correct: "Central Processing Unit" },
    { question: "What language is used for web development?", options: ["JavaScript", "Python", "C++", "Java"], correct: "JavaScript" },
    { question: "What is the main purpose of RAM?", options: ["Long-term storage", "Executing code", "Temporary storage", "Graphics rendering"], correct: "Temporary storage" },
  ],
};
