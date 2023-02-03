import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles['main-nav']}>
            <div className={styles['brand-logo']}>
                {/* <svg> */}
                    <img src="src\assets\general\Authlogo.png" alt="" />                    
                {/* </svg> */}
            </div>
            <div className={styles['nav-paths']}>
                <NavLink to={'/'}>
                    Home
                </NavLink>
                <NavLink to={''}>
                    About
                </NavLink>
                <NavLink to={''}>
                    Features
                </NavLink>
                <NavLink to={''}>
                    <button className={styles['get-started-btn']}>
                        Get Started
                    </button>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar