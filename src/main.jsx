import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Import the pages routes
import { AltStudent, Mentor, RegularStudent } from "./pages";

// import components from altStudent
import { AltStudentRegister, AltStudentLogin } from "./pages/auth/altStudent";

// import components from RegularStudent
import { RegularStudentRegister } from "./pages/auth/regularStudent";

// import components for UserLogin
import { ForgotPassword, LoginGroup, UserLogin } from "./pages/auth/userLogin";

// import components from Mentor
import { MentorLogin, MentorRegister } from "./pages/auth/mentor";

// set up router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/altstudent",
    element: <AltStudent />,
    children: [
      {
        path: "/altstudent/login",
        element: <AltStudentLogin />,
      },
      {
        path: "/altstudent/register",
        element: <AltStudentRegister />,
      },
    ],
  },
  {
    path: "/regularstudent",
    element: <RegularStudent />,
    children: [
      {
        path: "/regularstudent/login",
        element: <LoginGroup />,
        children: [
          {
            path: "/regularstudent/login/form",
            element: <UserLogin />,
          },
          {
            path: "/regularstudent/login/forgotpassword",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: "/regularstudent/register",
        element: <RegularStudentRegister />,
      },
    ],
  },
  {
    path: "/mentor",
    element: <Mentor />,
    children: [
     {
        path: "/mentor/login",
        element: <LoginGroup />,
        children: [
          {
            path: "/mentor/login/form",
            element: <UserLogin />,
          },
          {
            path: "/mentor/login/forgotpassword",
            element: <ForgotPassword />,
          },
        ],
      },

      {
        path: "/mentor/register",
        element: <MentorRegister />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
