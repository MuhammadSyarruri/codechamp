import { useState } from "react";

export default function QuestionsNavigation({
  questions,
  answers,
  currentQuestion,
  handleSwitchQuestion,
}) {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="questions-navigation">
      <button
        className="toggle-btn-switch"
        onClick={() => setShowNav((prev) => !prev)}
      >
        {showNav ? "Tutup Navigasi" : "Buka Navigasi"}
      </button>

      <div className={`btn-switch-container ${showNav ? "is-open" : ""}`}>
        {questions.map((_, index) => (
          <BtnSwitchQuestions
            key={index}
            number={index + 1}
            handleSwitchQuestion={handleSwitchQuestion}
            answered={answers}
            selected={currentQuestion}
          />
        ))}
      </div>
    </div>
  );
}

function BtnSwitchQuestions({
  number,
  handleSwitchQuestion,
  answered,
  selected,
}) {
  let bgColor = "";

  if (number === selected) {
    bgColor = "#328fa4";
  } else if (Object.prototype.hasOwnProperty.call(answered, number - 1)) {
    bgColor = "#177908";
  }

  return (
    <button
      style={{ backgroundColor: bgColor }}
      onClick={() => handleSwitchQuestion(number)}
    >
      {number}
    </button>
  );
}
