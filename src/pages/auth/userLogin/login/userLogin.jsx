import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import { Link, Outlet } from 'react-router-dom'
import userLoginStyle from './userLogin.module.css'
import eyeIcon from '../../../../assets/general/eye.svg'

export default function UserLogin () {
    const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={userLoginStyle.container}>
      <h2 className={userLoginStyle.header}>Welcome Back</h2>
      <form action='' className={userLoginStyle.form}>
        <div className={userLoginStyle.formGroup}>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='seun@studybuddy.com'
          />
        </div>
        <div className={userLoginStyle.passwordFormGroup}>
          <label htmlFor='password'>Password</label>
          <div className={userLoginStyle.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='********'
            />
            <img
              src={eyeIcon}
              alt='eye icon'
              className={userLoginStyle.showPasswordIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button className={userLoginStyle.loginButton}>Login</button>
        <Link to='/regularstudent/login/forgotpassword' className={userLoginStyle.forgotPassword}>
          Forgot Password?
        </Link>
      </form>
    </div>
  )
}
