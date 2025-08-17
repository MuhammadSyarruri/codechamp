import { useState } from "react";
import { auth, database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import LoginRegisterForm from "../components/LoginRegisterForm";

export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const defaultData = {
    displayName: displayName,
    leaderboard: {
      html: { correct: 0, timespent: 2000 },
      css: { correct: 0, timespent: 2000 },
      javascript: { correct: 0, timespent: 2000 },
      react: { correct: 0, timespent: 2000 },
      campuran: { correct: 0, timespent: 2000 },
    },
    quizCompleted: {
      html: { beginner: 0, intermediate: 0, expert: 0 },
      css: { beginner: 0, intermediate: 0, expert: 0 },
      javascript: { beginner: 0, intermediate: 0, expert: 0 },
      react: { beginner: 0, intermediate: 0, expert: 0 },
      campuran: { beginner: 0, intermediate: 0, expert: 0 },
    },
  };

  const register = async () => {
    try {
      if (!email || !displayName || !password) {
        alert("Lengkapi form terlebih dahulu");
        return;
      }

      if (password.length < 6) {
        alert("Password minimal 6 karakter");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      await set(ref(database, "users/" + userCredential.user.uid), defaultData);

      alert("Berhasil mendaftar");

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const resetPassword = async () => {
    if (!email) {
      alert("Masukkan email terlebih dahulu");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email reset password telah dikirim");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-register-page">
      <img
        key={isLogin ? "login" : "register"} // penting supaya React ganti img
        src={isLogin ? "/img/bg-login.png" : "/img/bg-register.png"}
        alt="background"
        className="bg-img fade"
      />
      <LoginRegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        displayName={displayName}
        setDisplayName={setDisplayName}
        login={login}
        register={register}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        resetPassword={resetPassword}
      />
    </div>
  );
}
