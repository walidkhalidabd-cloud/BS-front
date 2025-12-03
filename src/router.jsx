import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";
import NotFound from "./pages/NotFound";
import HomeMain from "./pages/home/partials/HomeMain";
import AddProject from "./pages/home/partials/AddProject";

import HomeProvider from "./pages/provider/Home";
import HomeMainProvider from "./pages/provider/partials/HomeMain";
import Projects from "./pages/provider/partials/Projects";

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
      },
    ],
  },
  {
    path: "/provider",
    element: <HomeProvider />,
    children: [
      {
        index: true,
        element: <HomeMainProvider />,
      },
      {
        path: "projects/:status",
        element: <Projects />,
      },      
      {
        path: "add-offer",
        element: <AddProject />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
