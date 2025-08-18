import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/privateRoute";

import Homepage from "../page/Homepage";
import QuizPage from "../page/QuizPage";
import ResultPage from "../page/ResultPage";
import LoginRegister from "../page/LoginRegister";
import LeaderboardPage from "../page/LeaderboardPage";

export const router = createBrowserRouter(
  [
    { path: "/", element: <LoginRegister /> },
    {
      element: <PrivateRoute />,
      children: [
        { path: "/home", element: <Homepage /> },
        { path: "/quiz", element: <QuizPage /> },
        { path: "/hasil", element: <ResultPage /> },
        { path: "/leaderboard", element: <LeaderboardPage /> },
      ],
    },
  ],
  { basename: "/codechamp" }
);
