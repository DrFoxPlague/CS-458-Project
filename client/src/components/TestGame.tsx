import { useState } from 'react';

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

export const TestGame = () => {
  // Set the selectedSubject type to be a key of subjects
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof subjects | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnsweringDisabled, setIsAnsweringDisabled] = useState(false);

  const handleSubjectSelect = (subject: keyof typeof subjects) => {
    setSelectedSubject(subject);
    setQuestionIndex(0);
    setScore(0);
  };

  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);

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
    }, 1500);
  };

  if (selectedSubject && questionIndex < subjects[selectedSubject].length) {
    const { question, options } = subjects[selectedSubject][questionIndex];
    return (
      <div className="quiz">
        <h2>{selectedSubject} Quiz</h2>
        <p>{question}</p>
        {feedback && (
          <p className={`feedback ${feedbackType}`}>{feedback}</p>
        )}
        <div className="options">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={isAnsweringDisabled} 
              // Disable button when in feedback mode
            >
              {option}
            </button>
          ))}
        </div>
        <p>Your score: {score}</p>
      </div>
    );
  }

  if (selectedSubject && questionIndex >= subjects[selectedSubject].length) {
    return (
      <div className="quiz">
        <h2>Congratulations! You completed the {selectedSubject} Quiz!</h2>
        <p>Your final score: {score}/{subjects[selectedSubject].length}</p>
        <button onClick={() => setSelectedSubject(null)}>Back to Subjects</button>
      </div>
    );
  }

  return (
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
  );
};
