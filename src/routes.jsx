import App from "./App";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
// import ErrorPage from "./pages/ErrorPage/ErrorPage";


const routes = [
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/map1",
        element: <MapPage />,
      },
    ],
  },
];

export default routes;