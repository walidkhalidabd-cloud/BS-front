import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";
import NotFound from "./pages/NotFound";
import HomeMain from "./pages/home/partials/HomeMain";
import AddProject from "./pages/home/partials/AddProject";

import HomeProvider from "./pages/provider/Home";
import HomeMainProvider from "./pages/provider/partials/HomeMain";

import AdminHome from "./pages/Admin/partials/Home";
import Projects from "./pages/provider/partials/Projects";
import ProjectDetails from "./pages/provider/partials/ProjectDetails";
import Dashboard from "./pages/Admin/Dashboard";
import DocumentType from "./pages/Admin/partials/DocumentType";
import ContactType from "./pages/Admin/partials/ContactType";
import AccountStatus from "./pages/Admin/partials/AccountStatus";
import ProjectType from "./pages/Admin/partials/ProjectType";
import Role from "./pages/Admin/partials/Role";

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
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <AdminHome/>,
      },
      {
        path: "document-types",
        element: <DocumentType />,
      },
      {
        path: "project-types",
        element: <ProjectType />,
      },
      {
        path: "roles",
        element: <Role />,
      },
      {
        path: "contact-types",
        element: <ContactType />,
      },
      {
        path: "account-statuses",
        element: <AccountStatus />,
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
        path: "project-details/:project_id",
        element: <ProjectDetails />,
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
