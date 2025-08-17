import { useLocation } from "react-router-dom";
import { allQuestions } from "../assets/data-soal/semua-soal";
import { useCallback, useEffect, useState } from "react";
import { formatToString } from "../utils/formatTime";
import DisplayQuestions from "../components/DisplayQuestions";
import EndQuiz from "../components/EndQuiz";
import QuestionsNavigation from "../components/QuestionsNavigation";
import NextPrevButton from "../components/NextPrevButton";

function calculateUserTimeSpent(timeLeft, totalTime) {
  return totalTime - timeLeft;
}

function getQuestions({ mode, difficulty, category, questionAmount }) {
  let filteredQuestions = [];

  if (mode === "tournament") {
    filteredQuestions = allQuestions.filter(
      (q) => q.kesulitan === "intermediate" || q.kesulitan === "expert"
    );
  } else {
    filteredQuestions = allQuestions.filter((q) => q.kesulitan === difficulty);
  }

  if (category !== "campuran") {
    filteredQuestions = filteredQuestions.filter(
      (q) => q.kategori === category
    );
  }

  const shuffle = [...filteredQuestions].sort(() => Math.random() - 0.5);
  return shuffle.slice(0, questionAmount);
}

export default function QuizPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const mode = params.get("mode");
  const category = params.get("category");
  const difficulty = params.get("difficulty");
  const questionAmount = mode === "tournament" ? 30 : 20;

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [endQuiz, setEndQuiz] = useState(false);
  const [timeSpent, setTimeSpent] = useState("");

  function handleAnswer(questionId, choiceId) {
    setAnswers((allAnswers) => ({
      ...allAnswers,
      [questionId]: choiceId,
    }));
  }

  useEffect(() => {
    const qs = getQuestions({
      mode,
      difficulty,
      category,
      questionAmount,
    });
    setQuestions(qs);
  }, [mode, difficulty, category, questionAmount]);

  useEffect(() => {
    if (mode === "tournament") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (timeLeft <= 1) {
            clearInterval(timer);
            setEndQuiz(true);
            setTimeSpent(calculateUserTimeSpent(timeLeft, 1800));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, timeLeft]);

  // Handler untuk berpindah soal
  const handleSwitchQuestion = useCallback((p) => {
    setCurrentQuestion(p);
  }, []);

  const handleNextQuestion = useCallback(
    (questions, currentQuestion) => {
      if (currentQuestion < questions.length) {
        handleSwitchQuestion(currentQuestion + 1);
      } else if (currentQuestion === questions.length) {
        setEndQuiz(true);
        setTimeSpent(calculateUserTimeSpent(timeLeft, 1800));
      }
    },
    [handleSwitchQuestion, timeLeft]
  );

  const handlePreviousQuestion = useCallback(
    (currentQuestion) => {
      if (currentQuestion > 1) {
        handleSwitchQuestion(currentQuestion - 1);
      }
    },
    [handleSwitchQuestion]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "e") {
        handleNextQuestion(questions, currentQuestion, answers);
      } else if (event.key === "q") {
        handlePreviousQuestion(currentQuestion);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    questions,
    currentQuestion,
    answers,
    handleNextQuestion,
    handlePreviousQuestion,
  ]);

  return (
    <div className="quiz-page">
      <h2 className="title">
        {mode === "tournament" ? "TURNAMEN" : "LATIHAN"}
      </h2>
      <hr />
      {endQuiz ? (
        <EndQuiz
          questions={questions}
          answers={answers}
          timeSpent={timeSpent}
          mode={mode}
          category={category}
          difficulty={difficulty}
        />
      ) : (
        <>
          <div className="timestamp">
            {mode === "tournament" && formatToString(timeLeft)}
          </div>
          <div className="quiz-container">
            <QuestionsNavigation
              questions={questions}
              answers={answers}
              currentQuestion={currentQuestion}
              handleSwitchQuestion={handleSwitchQuestion}
            />
            <div className="vertical-line"></div>
            <div className="question-section">
              {questions.length > 0 && (
                <DisplayQuestions
                  questions={questions}
                  currentQuestion={currentQuestion}
                  answer={answers[currentQuestion - 1]}
                  handleAnswer={handleAnswer}
                />
              )}
              <NextPrevButton
                handlePreviousQuestion={handlePreviousQuestion}
                handleNextQuestion={handleNextQuestion}
                currentQuestion={currentQuestion}
                questions={questions}
                answers={answers}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
