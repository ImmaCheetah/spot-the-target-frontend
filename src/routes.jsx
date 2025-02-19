import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MapPage from "./pages/MapPage";

const routes = [
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/map/:mapId",
        element: <MapPage />,
      },
      {
        path: "/leaderboard/map/:mapId",
        element: <LeaderboardPage />,
      },
    ],
  },
];

export default routes;
