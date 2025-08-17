import { useLocation, useNavigate } from "react-router-dom";
import DisplayQuestions from "../components/DisplayQuestions";
import { formatToString } from "../utils/formatTime";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers, score, timeSpent, mode } = location.state || {};

  if (!questions || !answers || score === undefined) {
    return <div>Data tidak lengkap untuk menampilkan hasil.</div>;
  }

  const userScreenWidth = window.innerWidth;

  return (
    <div className="quiz-result-page">
      <h1>Hasil Quiz</h1>
      <p>
        Skor Anda: {score} dari {questions.length}
      </p>
      {mode === "tournament" && (
        <p>
          Anda memerlukan waktu {formatToString(timeSpent)} untuk menyelesaikan
          quiz.
        </p>
      )}
      <ul>
        {questions.map((q, index) => (
          <li key={q.id}>
            <DisplayQuestions
              questions={questions}
              currentQuestion={index + 1}
              answer={answers[index]}
              isReview={true}
            />
          </li>
        ))}
        <div className="btn-navigation">
          <button onClick={() => navigate("/home")}>
            {userScreenWidth <= 768 ? "❌" : "Kembali ke beranda"}
          </button>
        </div>
      </ul>
    </div>
  );
}
