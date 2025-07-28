import { useState } from "react";

export default function App() {
  return (
    <>
      <LandingPage />
    </>
  );
}

function LandingPage() {
  return (
    <>
      <div className="landing-page">
        <div className="vertical-title">
          <span>R</span>
          <span>A</span>
          <span>N</span>
          <span>K</span>
          <span>R</span>
          <span>U</span>
          <span>S</span>
          <span>H</span>
        </div>
        <StartPage />
        <LeaderboardPage />
      </div>
    </>
  );
}

function StartPage() {
  const [isTournament, setIsTournament] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  function openQuizOption(data) {
    if (data === "tournament") setIsTournament(true);
    setOpenOption(true);
  }

  function closeQuizOption() {
    setIsTournament(false);
    setOpenOption(false);
  }

  return (
    <div className="start-page page">
      <button
        onClick={() => {
          openQuizOption("exercise");
        }}
      >
        Mulai Latihan Quiz
      </button>
      <button
        onClick={() => {
          openQuizOption("tournament");
        }}
      >
        Mulai Turnamen Quiz
      </button>

      {openOption && (
        <QuizOption
          closeQuizOption={closeQuizOption}
          isTournament={isTournament}
        />
      )}
    </div>
  );
}

function QuizOption({ closeQuizOption, isTournament }) {
  return (
    <div className="exercise-page">
      <div className="side-button">
        {isTournament && <button>❔</button>}
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
        <select name="category" id="categorySelect">
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="javascript">Javascript</option>
          <option value="react">React</option>
        </select>
      </div>
      {isTournament ? (
        ""
      ) : (
        <div className="quiz-option">
          <label htmlFor="difficultySelect">Pilih kesulitan soal</label>
          <select name="difficulty" id="difficultySelect">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      )}
      <button>Mulai</button>
    </div>
  );
}

function LeaderboardPage() {
  return (
    <>
      <div className="leaderboard-page page">
        <h2>Leaderboard</h2>
        <div className="leaderboard-container">
          <div id="html-leaderboard">
            <span>HTML Leaderboard</span>
            <p>1. muhammad syarruri</p>
            <p>2. muhammad syarruri</p>
            <p>3. muhammad syarruri</p>
            <p>4. muhammad syarruri</p>
          </div>
          <div id="css-leaderboard">
            <span>CSS Leaderboard</span>
            <p>1. muhammad syarruri</p>
            <p>2. muhammad syarruri</p>
            <p>3. muhammad syarruri</p>
            <p>4. muhammad syarruri</p>
          </div>
          <div id="js-leaderboard">
            <span>Javascript Leaderboard</span>
            <p>1. muhammad syarruri</p>
            <p>2. muhammad syarruri</p>
            <p>3. muhammad syarruri</p>
            <p>4. muhammad syarruri</p>
          </div>
          <div id="react-leaderboard">
            <span>React Leaderboard</span>
            <p>1. muhammad syarruri</p>
            <p>2. muhammad syarruri</p>
            <p>3. muhammad syarruri</p>
            <p>4. muhammad syarruri</p>
          </div>
        </div>
      </div>
    </>
  );
}
