import React, { useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import AltStudentLogin from './altStudentLogin/altStudentLogin'
import AltStudentRegister from './altStudentRegister/altStudentRegister'

export default function AltStudent () {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/altstudent/register')
  }, [])
  return (
    <div>
      <div className=''>
        <img src='' alt='' />
        <h1>Alt Student</h1>
      </div>
      <div className=''>
        <Link to='/altstudent/login'>Login</Link>
        <Link to='/altstudent/register'>Register</Link>
        <Outlet />
      </div>
    </div>
  )
}
