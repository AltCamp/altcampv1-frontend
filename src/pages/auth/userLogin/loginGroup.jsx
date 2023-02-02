import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function LoginGroup () {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/regularstudent/login/form')
  }, [])
  return (
    <div>
      <Outlet />
    </div>
  )
}
