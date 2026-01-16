import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";

import Home from "./pages/home/Home";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";
import HomeMain from "./pages/home/partials/HomeMain";
import AddProject from "./pages/home/partials/AddProject";
import CustomerProject from "./pages/home/partials/Projects";
import Forbidden from "./pages/home/partials/Forbidden";
import Guideline from "./pages/home/partials/Guideline";
import About from "./pages/home/partials/About";
import ClientType from "./pages/home/partials/ClientType";

import HomeClient from "./pages/client/Home";
import HomeMainClient from "./pages/client/partials/HomeMain";
import AddOffer from "./pages/Client/partials/AddOffer";

import AdminHome from "./pages/Admin/partials/Home";
import Clients from "./pages/Admin/partials/Clients";
import ClientDetail from "./pages/Admin/partials/ClientDetail";
import Projects from "./pages/client/partials/Projects";
import ProjectDetails from "./pages/client/partials/ProjectDetails";
import Dashboard from "./pages/Admin/Dashboard";
import DocumentType from "./pages/Admin/partials/DocumentType";
import ContactType from "./pages/Admin/partials/ContactType";
import ProjectType from "./pages/Admin/partials/ProjectType";
import Role from "./pages/Admin/partials/Role";

import ProtectedRoute from "./Components/ProtectedRoute";

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
        path: "about",
        element: <About />,
      },
      {
        path: "clients/:role",
        element: (
          <ProtectedRoute>
            <ClientType />
          </ProtectedRoute>
        ),
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
        path: "projects",
        element: (
          <ProtectedRoute>
            <CustomerProject />
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
      {
        path: "client-detail",
        element: <ClientDetail />,
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
