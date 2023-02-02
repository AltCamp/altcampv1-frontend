import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Import the pages routes
import {AltStudent, Mentor} from './pages'

// import components from altStudent
import {AltStudent, Mentor} AltStudentRegister, AltStudentfrom './pages'

// import components from altStuden } from './pages/auth/altStudent'

// Import { logint
import { AltStudentRegister, AltStudentLogin } from /pages
import Landing from './pages/landing/landing'
import Login from './pages/login/login'
import Register from './pages/register/register/auth/altStudent'


// set up router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/altstudent',
    element: <AltStudent />,
    children: [
      {
        path: '/altstudent',
    element: <AltStudent />,
    children: [
      {
        path: '/altstudent/altstudent/login',
            element: <AltStudentAltStudentLogin />
      },
      {
        path: '/altstudent/register',
        element: <AltStudentRegister />
      }
    ]
      },
      {
        path: '/altstudent/register',
        element: <AltStudentRegister />
      },
  {
    path: '/',
    element: <Landing />}
    ]
  },
  // {
  //   path: '/register',
  //   element: <Register />
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
