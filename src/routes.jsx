import App from "./App";
import HomePage from "./pages/HomePage";
// import ErrorPage from "./pages/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      // { index: true, element: <HomePage /> },

    ],
  },
  {
    path: "/home",
    element: <HomePage />,
  },
];

export default routes;