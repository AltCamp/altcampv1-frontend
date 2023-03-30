import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import userLoginStyle from './userLogin.module.css'
import eyeIcon from '../../../../assets/general/eye.svg'

// import apiSLice hook
import { useLoginMutation } from '../../../../app/slices/apiSlices/authSlice'

export default function UserLogin () {
  const [showPassword, setShowPassword] = useState(false)

  const parentPath = useLocation().pathname.split('/')[1]
  // console.log(parentPath)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // console.log(email, password)
  const [login, { isSuccess, isLoading, data, isError, error }] =
    useLoginMutation()

  const handleLogin = e => {
    e.preventDefault()
    login({ email: email, password: password })
  }

  console.log(data)
  console.log(error)

  return (
    <div className={userLoginStyle.container}>
      <h2 className={userLoginStyle.header}>Welcome Back</h2>
      <form className={userLoginStyle.form} onSubmit={handleLogin}>
        <div className={userLoginStyle.formGroup}>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='seun@studybuddy.com'
            onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
            />
            <img
              src={eyeIcon}
              alt='eye icon'
              className={userLoginStyle.showPasswordIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button
          className={userLoginStyle.loginButton}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Unlocking the door' : 'Login'}
        </button>
        <Link
          to={`/${parentPath}/login/forgotpassword`}
          className={userLoginStyle.forgotPassword}
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  )
}
