import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";
import NotFound from "./pages/NotFound";
import HomeMain from "./pages/home/partials/HomeMain";
import AddProject from "./pages/home/partials/AddProject";

import HomeClient from "./pages/client/Home";
import HomeMainClient from "./pages/client/partials/HomeMain";

import AdminHome from "./pages/Admin/partials/Home";
import Projects from "./pages/client/partials/Projects";
import ProjectDetails from "./pages/client/partials/ProjectDetails";
import Dashboard from "./pages/Admin/Dashboard";
import DocumentType from "./pages/Admin/partials/DocumentType";
import ContactType from "./pages/Admin/partials/ContactType";
import ProjectType from "./pages/Admin/partials/ProjectType";
import Role from "./pages/Admin/partials/Role";
import ProtectedRoute from "./Components/ProtectedRoute";
import Forbidden from "./pages/home/partials/Forbidden";
import Clients from "./pages/Admin/partials/Clients";
import AddOffer from "./pages/Client/partials/AddOffer";
import Guideline from "./pages/home/partials/Guideline";

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
        path: "guideline",
        element: <Guideline />,
      },
      {
        path: "add-project",
        element: (
          <ProtectedRoute>
            <AddProject />
          </ProtectedRoute>
        ),
      },
      {
        path: "forbidden",
        element: <Forbidden />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute type="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
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
        path: "clients/:status",
        element: <Clients />,
      },
    ],
  },
  {
    path: "/client",
    element: (
      <ProtectedRoute type="client">
        <HomeClient />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeMainClient />,
      },
      {
        path: "projects/:projectStatus",
        element: <Projects />,
      },
      {
        path: "project-details/:project_id",
        element: <ProjectDetails />,
      },
      {
        path: "add-offer/:projectId",
        element: <AddOffer />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
