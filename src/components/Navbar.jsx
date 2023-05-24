import React from 'react'
import { NavLink } from 'react-router-dom'
import mainNavbarStyles from './Navbar.module.css'
import { HambergerMenu } from 'iconsax-react';
import { useState } from 'react';
import altcamplogo from '../assets/general/AuthWhiteLogo.svg'

const MainNavbar = () => {
  const [openNavOptions, setOpenNavOptions] = useState(false)
  const [showregisterOptions, setShowRegisterOptions] = useState(false)

  return (
    <>
      <nav className={mainNavbarStyles['main-nav']}>
        <NavLink href="">
          <img src={altcamplogo} alt="logo" />
        </NavLink>
        <ul className={mainNavbarStyles['nav-paths']}>
          <li><NavLink href="#">Home</NavLink></li>
          <li><NavLink href="#">About</NavLink></li>
          <li><NavLink href="#">Features</NavLink></li>
          <button onClick={() => setShowRegisterOptions(prev => !prev)
          } className={mainNavbarStyles['get-started-btn']}><NavLink href="#" >Get Started</NavLink></button>
          <section className={`${mainNavbarStyles['register-options']} ${showregisterOptions ? mainNavbarStyles['show'] : ''} `}>
            <ul>
              <li>
                <NavLink to='/account'>As an Altschooler</NavLink>
              </li>
              <li>
                <NavLink to='/account'>
                  As an Instructor/Mentor
                </NavLink>
              </li>
              <li>
                <NavLink to='/account'>As a Regular Student</NavLink>
              </li>
            </ul>
          </section>
          <section className={`${mainNavbarStyles['nav-options']} ${openNavOptions ? mainNavbarStyles['open'] : ''} `}>
            <ul>
              <li>
                <NavLink>Home</NavLink>
              </li>
              <li>
                <NavLink>About</NavLink>
              </li>
              <li>
                <NavLink>Features</NavLink>
              </li>
            </ul>
          </section>
        </ul>
        <div className={mainNavbarStyles['options-icon']} onClick={() => {
          setOpenNavOptions(prev => !prev)
        }}>
          <HambergerMenu size="32" color="#fff" />
        </div>

      </nav>
    </>
  );
}

export default MainNavbar