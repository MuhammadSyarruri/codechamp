import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizOption from "./QuizOption";

export default function Navigation() {
  const navigate = useNavigate();

  const [isTournament, setIsTournament] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  function closeQuizOption() {
    setIsTournament(false);
    setOpenOption(false);
  }

  return (
    <div className="navigation">
      <button
        onClick={() => {
          setOpenOption(true);
          setIsTournament(false);
        }}
      >
        Mulai Latihan Quiz
      </button>
      <button
        onClick={() => {
          setOpenOption(true);
          setIsTournament(true);
        }}
      >
        Mulai Turnamen Quiz
      </button>
      <button onClick={() => navigate("/leaderboard")}>Papan Peringkat</button>

      {openOption && (
        <QuizOption
          closeQuizOption={closeQuizOption}
          isTournament={isTournament}
        />
      )}
    </div>
  );
}
