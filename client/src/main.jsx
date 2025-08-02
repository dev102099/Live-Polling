import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import EnterName from "./pages/EnterName.jsx";
import TeachersPolling from "./pages/TeachersPolling.jsx";
import WaitingPage from "./pages/WaitingPage.jsx";
import LivePolling from "./pages/LivePolling.jsx";
import TeacherResultsView from "./pages/TeachersResultsView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/details", element: <EnterName /> },
  { path: "/teachers-polling", element: <TeachersPolling /> },
  { path: "/waiting", element: <WaitingPage /> },
  { path: "/live-poll", element: <LivePolling /> },
  { path: "/teachers-result", element: <TeacherResultsView /> },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
