import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";
import NotFound from "./pages/NotFound";
import Main from "./pages/home/partials/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },  
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
