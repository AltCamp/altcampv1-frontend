import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Import the pages routes
import {AltStudent, Mentor} from './pages'

// import components from altStudent
import { AltStudentRegister, AltStudentLogin } from './pages/auth/altStudent'

// Import { login, Register } from /pages
import Landing from './pages/landing/landing'
import Login from './pages/login/login'
import Register from './pages/register/register'

// set up router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/altstudent',
    element: <AltStudent />,
    children: [
      {
        path: '/altstudent/login',
        element: <AltStudentLogin />
      },
      {
        path: '/altstudent/register',
        element: <AltStudentRegister />
      }
    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <Landing />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
