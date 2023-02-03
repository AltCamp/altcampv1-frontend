import { element } from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Import the pages routes
import { AltStudent, Mentor, RegularStudent } from './pages'

// import components from altStudent
import { AltStudentRegister, AltStudentLogin } from './pages/auth/altStudent'

// import components from RegularStudent
import { RegularStudentRegister, RegularStudentLogin } from './pages/auth/regularStudent'
import Landing from './pages/landing/landing'

// set up router using createBrowserRouter
const router = createBrowserRouter([
  {
      path: '/',
      element: <Landing />
  },
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
    path: '/regularstudent',
    element: <RegularStudent />,
    children: [
      {
        path: '/regularstudent/login',
        element: <RegularStudentLogin />
      },
      {
        path: '/regularstudent/register',
        element: <RegularStudentRegister />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
