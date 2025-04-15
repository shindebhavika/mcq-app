import { useState } from "react";
import questions from "../questions";
import Submit from "./Submit";
import { useSearchParams } from "react-router-dom";

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "User";
  const handleOptionClick = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentQ]: option });
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else setShowScore(true);
  };

  const prevQuestion = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.answer) score++;
    });
    return score;
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOptions({});
    setShowScore(false);
  };

  const currentQuestion = questions[currentQ];

  return (
    <>
      {showScore ? (
        <Submit score={calculateScore()} total={questions.length} onRetry={resetQuiz} />
      ) : (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
         <h1 className="text-right font-extrabold "> 👤{name}</h1>
          <h2 className="text-xl font-semibold mb-4">
            Question {currentQ + 1} of {questions.length}
          </h2>
          <p className="text-lg mb-4">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOptions[currentQ] === option;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full px-4 py-2 rounded border ${
                    isSelected
                      ? "bg-black"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={currentQ === 0}
              className={`px-4 py-2 rounded ${
                currentQ === 0
                  ? "bg-blue-200 cursor-not-allowed"
                  : "bg-teal-800 hover:bg-teal-600"
              }`}
            >
              Previous
            </button>
            <button
  onClick={nextQuestion}
  disabled={!Object.prototype.hasOwnProperty.call(selectedOptions, currentQ)}
  className={`px-4 py-2 rounded ${
    Object.prototype.hasOwnProperty.call(selectedOptions, currentQ)
      ? "bg-teal-500 hover:bg-green-600"
      : "bg-green-200 cursor-not-allowed"
  }`}
>
  {currentQ === questions.length - 1 ? "Finish" : "Next"}
</button>

          </div>
 
        </div>
      )}
    </>
  );
};

export default Quiz;
