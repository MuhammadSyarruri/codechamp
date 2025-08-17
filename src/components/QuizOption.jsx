import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizOption({ closeQuizOption, isTournament }) {
  const [openBubble, setOpenBubble] = useState(false);
  const [category, setCategory] = useState("html");
  const [difficulty, setDifficulty] = useState("beginner");
  const navigate = useNavigate();

  function handleStart(mode, category, difficulty) {
    navigate(
      `/quiz?mode=${mode}&category=${category}&difficulty=${difficulty}`
    );
  }

  function handleCategory(changeCategory) {
    setCategory(changeCategory);
  }

  function handleDifficulty(changeDifficulty) {
    setDifficulty(changeDifficulty);
  }

  return (
    <div className="option-container">
      <div className="side-button">
        {openBubble && (
          <div className="information-bubble">
            Dalam mode turnamen soal akan diambil dari kesulitan intermediate
            dan expert secara acak.
          </div>
        )}
        {isTournament && (
          <button
            onMouseEnter={() => {
              setOpenBubble(true);
            }}
            onMouseLeave={() => {
              setOpenBubble(false);
            }}
          >
            ❔
          </button>
        )}
        <button
          onClick={() => {
            closeQuizOption();
          }}
        >
          ❌
        </button>
      </div>
      <p>{isTournament ? "TURNAMEN" : "LATIHAN"}</p>
      <div className="quiz-option">
        <label htmlFor="categorySelect">Pilih kategori soal</label>
        <select
          name="category"
          id="categorySelect"
          onChange={(e) => {
            handleCategory(e.target.value);
          }}
        >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="javascript">Javascript</option>
          <option value="react">React</option>
          <option value="campuran">campuran</option>
        </select>
      </div>
      {!isTournament && (
        <div className="quiz-option">
          <label htmlFor="difficultySelect">Pilih kesulitan soal</label>
          <select
            name="difficulty"
            id="difficultySelect"
            onChange={(e) => {
              handleDifficulty(e.target.value);
            }}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      )}
      <button
        onClick={() => {
          handleStart(
            isTournament ? "tournament" : "exercise",
            category,
            difficulty
          );
        }}
      >
        Mulai
      </button>
    </div>
  );
}
