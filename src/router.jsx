import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";
import NotFound from "./pages/NotFound";
import HomeMain from "./pages/home/partials/HomeMain";
import AddProject from "./pages/home/partials/AddProject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HomeMain />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-project",
        element: <AddProject />,
      }
    ],
  },  
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
