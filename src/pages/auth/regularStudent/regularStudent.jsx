import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import authHeroImage from '../../../assets/general/AuthBackground.webp'
import studyBuddyLogo from '../../../assets/general/Authlogo.png'
import './regularStudent.css'

// import child components
import RegularStudentLogin from './regularStudentLogin/regularStudentLogin'
import RegularStudentRegister from './regularStudentRegister/regularStudentRegister'

export default function RegularStudent () {
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
      <div className=''>
        <Outlet />
      </div>
    </div>
  )
}
