import { useNavigate } from "react-router-dom";
import { allQuestions } from "../assets/data-soal/semua-soal";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { formatToString } from "../utils/formatTime";

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    async function getUsersData() {
      try {
        const db = getDatabase();
        const usersRef = ref(db, "users");
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          const allUsers = snapshot.val();
          setUsersData(allUsers);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getUsersData();
  }, []);

  const category = [
    ...new Set(allQuestions.map((q) => q.kategori)),
    "campuran",
  ];

  return (
    <>
      <header>
        <h1>CodeChamp</h1>
        <button onClick={() => navigate("/home")}>Kembali ke beranda</button>
      </header>
      <div className="leaderboard-page">
        {category.map((k, index) => (
          <Leaderboard category={k} key={index} usersData={usersData} />
        ))}
      </div>
    </>
  );
}

function Leaderboard({ category, usersData }) {
  const sortedUsers = Object.entries(usersData)
    .map(([uid, data]) => ({
      uid,
      name: data.displayName,
      correct: data.leaderboard[category].correct,
      timespent: data.leaderboard[category].timespent,
    }))
    .filter((user) => !(user.correct === 0 && user.timespent === 2000))
    .sort((a, b) => {
      if (b.correct !== a.correct) {
        return b.correct - a.correct;
      }
      return a.timespent - b.timespent;
    })
    .slice(0, 50);

  return (
    <div className="leaderboard-container">
      <h2>{category}</h2>
      <table>
        <thead>
          <tr>
            <th>Peringkat</th>
            <th>Nama</th>
            <th>Jawaban benar</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => {
            let rankColor;

            switch (index) {
              case 0:
                rankColor = "#ffD700";
                break;
              case 1:
                rankColor = "#C0C0C0";
                break;
              case 2:
                rankColor = "#D4AF37";
                break;
              default:
                rankColor = "";
                break;
            }

            return (
              <tr
                key={user.uid}
                className={index <= 2 && "top-rank"}
                style={{ backgroundColor: rankColor }}
              >
                <td>{index + 1}</td>
                <td className="rank-name">{user.name}</td>
                <td>{user.correct}</td>
                <td>{formatToString(user.timespent)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
