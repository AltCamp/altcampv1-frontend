import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, Outlet } from 'react-router-dom'
import rglrStudLoginStyle from './regularStudentLogin.module.css'
import eyeIcon from '../../../../../assets/general/eye.svg'

export default function RegularStudentLogin () {
    const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={rglrStudLoginStyle.container}>
      <h2 className={rglrStudLoginStyle.header}>Welcome Back</h2>
      <form action='' className={rglrStudLoginStyle.form}>
        <div className={rglrStudLoginStyle.formGroup}>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='seun@studybuddy.com'
          />
        </div>
        <div className={rglrStudLoginStyle.passwordFormGroup}>
          <label htmlFor='password'>Password</label>
          <div className={rglrStudLoginStyle.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='********'
            />
            <img
              src={eyeIcon}
              alt='eye icon'
              className={rglrStudLoginStyle.showPasswordIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button className={rglrStudLoginStyle.loginButton}>Login</button>
        <Link to='/regularstudent/login/forgotpassword' className={rglrStudLoginStyle.forgotPassword}>
          Forgot Password?
        </Link>
      </form>
    </div>
  )
}
