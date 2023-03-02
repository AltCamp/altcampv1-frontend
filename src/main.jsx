import { element } from 'prop-types'
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Import the pages routes
import { AltStudent, Mentor, RegularStudent } from "./pages";

// import components from altStudent
import { AltStudentRegister } from "./pages/auth/altStudent";

// import components from RegularStudent
import { RegularStudentRegister } from "./pages/auth/regularStudent";

// import components for UserLogin
import { ForgotPassword, LoginGroup, UserLogin } from "./pages/auth/userLogin";

// import components from Mentor
import { MentorRegister } from "./pages/auth/mentor";
import Landing from './pages/landing/landing';

import Layout from './pages/dashboard/layout/layout'	

// import dashboard pages from layout
import { Community, Feed, Bookmarks, Profile, Notifications, Contributors, Resources, Topics, Settings, Circle, Quiz } from "./pages/dashboard/pages";

// set up router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: "/altstudent",
    element: <AltStudent />,
    children: [
      {
        path: "/altstudent/login",
        element: <LoginGroup />,
        children: [
          {
            index: true,
            element: <UserLogin />,
          },
          {
            path: "/altstudent/login/forgotpassword",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        index: true,
        element: <AltStudentRegister />,
      }
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
            index: true,
            element: <UserLogin />,
          },
          {
            path: "/regularstudent/login/forgotpassword",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        index: true,
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
            index: true,
            element: <UserLogin />,
          },
          {
            path: "/mentor/login/forgotpassword",
            element: <ForgotPassword />,
          },
        ],
      },

      {
        index: true,
        element: <MentorRegister />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "/dashboard/community",
        element: <Community />,
      },
      {
        path: "/dashboard/bookmarks",
        element: <Bookmarks />
      },
      {
        path: "/dashboard/profile",
        element: <Profile />
      },
      {
        path: "/dashboard/contributors",
        element: <Contributors />
      },
      {
        path: "/dashboard/notifications",
        element: <Notifications />
      },
      {
        path: "/dashboard/resources",
        element: <Resources />
      },
      {
        path: "/dashboard/topics",
        element: <Topics />
      },
      {
        path: "/dashboard/settings",
        element: <Settings />
      },
      {
        path: "/dashboard/circle",
        element: <Circle />
      },
      {
        path: "/dashboard/quiz",
        element: <Quiz />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);