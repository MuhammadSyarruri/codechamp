import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, get, update } from "firebase/database";

function calculateScore(answers, correctAnswers) {
  let score = 0;
  Object.keys(answers).forEach((key) => {
    if (answers[key] === correctAnswers[key]) {
      score += 1;
    }
  });
  return score;
}

// Komponen yang akan aktif ketika user menyelesaikan quiz
export default function EndQuiz({
  questions,
  answers,
  timeSpent,
  mode,
  category,
  difficulty,
}) {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const correctAnswers = questions.map((q) => q.jawaban);
  const score = calculateScore(answers, correctAnswers);

  if (mode === "tournament") {
    const userRef = ref(
      database,
      "users/" + user.uid + "/leaderboard/" + category
    );

    get(userRef).then((snapshot) => {
      const prevData = snapshot.val();

      if (
        score > prevData.correct ||
        (score === prevData.correct && timeSpent < prevData.timespent)
      ) {
        update(userRef, { correct: score, timespent: timeSpent });
      }
    });
  } else {
    const userRef = ref(
      database,
      "users/" + user.uid + "/quizCompleted/" + category
    );
    get(userRef).then((snapshot) => {
      const prevData = snapshot.val();
      const currentCount = prevData[difficulty];

      update(userRef, {
        [difficulty]: currentCount + 1,
      });
    });
  }

  return (
    <div className="end-quiz">
      <h3>Quiz Selesai!</h3>
      <p className="score">
        Skor Anda: {score} dari {questions.length}
      </p>
      <p>Terima kasih telah berpartisipasi!</p>
      <button
        onClick={() => {
          navigate("/hasil", {
            state: { questions, answers, score, timeSpent, mode },
          });
          console.log("questions", questions);
          console.log("answers", answers);
          console.log("score", score);
          console.log("timespent", timeSpent);
          console.log("mode", mode);
        }}
      >
        Lihat Hasil
      </button>
      <button onClick={() => navigate("/home")}>Kembali ke Beranda</button>
      <button onClick={() => window.location.reload()}>Mulai Lagi</button>
    </div>
  );
}
