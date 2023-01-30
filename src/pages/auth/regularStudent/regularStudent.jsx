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
    <div>
      <div className=''>
        <img src={authHeroImage} alt='' className='' />
      </div>
      <div className=''>
        <Outlet />
      </div>
    </div>
  )
}
