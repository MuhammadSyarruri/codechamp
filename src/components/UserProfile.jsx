import { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { set, ref, get, getDatabase } from "firebase/database";
import { updateProfile } from "firebase/auth";
import { formatToString } from "../utils/formatTime";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const user = auth.currentUser;

  async function changeName() {
    const newName = prompt("Masukkan nama baru:", user.displayName);

    if (!newName || newName.trim() === "") return;

    try {
      await updateProfile(user, { displayName: newName });

      await set(ref(database, `users/${user.uid}/displayName`), newName);

      setUserData((prevData) => ({
        ...prevData,
        displayName: newName,
      }));
    } catch (error) {
      console.error("Gagal memperbarui display name:", error);
      throw error;
    }
  }

  useEffect(() => {
    if (!user) return;

    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}`);

    get(userRef)
      .then((snapshot) => {
        setUserData(snapshot.val());
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>{userData.displayName}</h2>
        <img
          src="img/pencil-square.png"
          alt="change name"
          className="icon"
          onClick={() => changeName()}
        />
      </div>
      <hr />
      <div className="profile-stats">
        <div className="quiz-stats">
          <p>Jumlah Quiz Diselesaikan.</p>
          <ProfileQuizStats userData={userData} />
        </div>
        <div className="leaderboard-stats">
          <p>Ranking Anda di Papan Peringkat.</p>
          <ProfileLeaderboardStats userData={userData} />
        </div>
      </div>
    </div>
  );
}

function ProfileQuizStats({ userData }) {
  const [detail, setDetail] = useState(null);

  function toggleDetail(key) {
    setDetail((active) => (active === key ? null : key));
  }

  if (!userData || !userData.quizCompleted) {
    return <p>Loading quiz stats...</p>;
  }

  return (
    <>
      {Object.keys(userData.quizCompleted).map((key) => {
        const category = userData.quizCompleted[key];
        const total =
          category?.beginner + category?.intermediate + category?.expert;

        return (
          <div key={key} onClick={() => toggleDetail(key)}>
            <p>
              {key} : {total}
            </p>
            {detail === key ? (
              <ul>
                <li>Beginner: {category?.beginner ?? 0}</li>
                <li>Intermediate: {category?.intermediate ?? 0}</li>
                <li>Expert: {category?.expert ?? 0}</li>
              </ul>
            ) : (
              <span>klik untuk lihat detail</span>
            )}
          </div>
        );
      })}
    </>
  );
}

function ProfileLeaderboardStats({ userData }) {
  const [detail, setDetail] = useState(null);
  const [ranks, setRanks] = useState({});
  const user = auth.currentUser;

  useEffect(() => {
    if (!userData || !userData.leaderboard) return;

    const db = getDatabase();
    const usersRef = ref(db, "users");

    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const allUsers = snapshot.val();
        const calculatedRanks = {};

        Object.keys(userData.leaderboard).forEach((category) => {
          const sorted = Object.entries(allUsers)
            .map(([uid, data]) => ({
              uid,
              correct: data.leaderboard?.[category]?.correct || 0,
              timespent: data.leaderboard?.[category]?.timespent || Infinity,
            }))
            .filter((u) => !(u.correct === 0 && u.timespent === 2000))
            .sort((a, b) => {
              if (b.correct !== a.correct) return b.correct - a.correct;
              return a.timespent - b.timespent;
            });

          const rank = sorted.findIndex((u) => u.uid === user.uid) + 1;
          calculatedRanks[category] = rank > 0 ? rank : null;
        });

        setRanks(calculatedRanks);
      }
    });
  }, [userData, user]);

  function toggleDetail(key) {
    setDetail((active) => (active === key ? null : key));
  }

  if (!userData || !userData.leaderboard) {
    return <p>Loading leaderboard stats...</p>;
  }

  return (
    <>
      {Object.keys(userData.leaderboard).map((key) => {
        const category = userData.leaderboard[key];

        return (
          <div key={key} onClick={() => toggleDetail(key)}>
            <p>
              {key} :{" "}
              {ranks[key] ? `Peringkat ${ranks[key]}` : "Tidak ada peringkat"}
            </p>
            {detail === key ? (
              <ul>
                <li>Jawaban benar: {category?.correct ?? 0}</li>
                <li>
                  Waktu pengerjaan:{" "}
                  {category?.timespent <= 1800
                    ? formatToString(category?.timespent)
                    : "Belum mengerjakan"}
                </li>
              </ul>
            ) : (
              <span>klik untuk lihat detail</span>
            )}
          </div>
        );
      })}
    </>
  );
}
