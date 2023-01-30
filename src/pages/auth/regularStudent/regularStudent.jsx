import React, { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import authHeroImage from '../../../assets/general/AuthBackground.webp'
import studyBuddyLogo from '../../../assets/general/Authlogo.png'
import './regularStudent.css'

export default function RegularStudent () {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/regularstudent/register')
  }, [])

  let activeStyle = {
    color: '#212529',
    fontWeight: '700',
    borderBottom: '4px solid #212529',
  }

  return (
    <div className='rglrStudent'>
      <div className='rglrHero'>
        <div className='rglrHeroOverlay'>
          <div className='rglrHeroContent'>
            <img src={studyBuddyLogo} alt='studyBuddy Logo' className='' />
            <p className=''>
              Learning made easy and interesting. Share what you know even as
              you learn what you something new
            </p>
          </div>
        </div>
        <img src={authHeroImage} alt='hero image of a student' className='' />
      </div>
      <div className='rglrAuthSection'>
        <div className='rglrAuthContent'>
          <nav className=''>
            <NavLink
              to='/regularstudent/register'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='a1'
            >
              REGISTER
            </NavLink>
            <NavLink
              to='/regularstudent/login'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className='a2'
            >
              LOGIN
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
