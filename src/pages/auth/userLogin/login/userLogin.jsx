import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import userLoginStyle from './userLogin.module.css'
import eyeIcon from '../../../../assets/general/eye.svg'
import eyeClosedIcon from '../../../../assets/general/eyeclosed.svg'

// import apiSLice hook
import { useLoginMutation } from '../../../../app/slices/apiSlices/authSlice'

import { useDispatch } from 'react-redux'

import { setUser } from '../../../../app/slices/generalSlices/userSlice'
import Toaster from '../../../../components/Toaster/Toaster'

export default function UserLogin () {
  const [showPassword, setShowPassword] = useState(false)

  const parentPath = useLocation().pathname.split('/')[1]

  const [toastText, setToastText] = useState('')
  const [toastType, setToastType] = useState("info")

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  
  const [login, { isSuccess, isLoading, data, isError, error }] =
    useLoginMutation()

  const handleLogin = e => {
    e.preventDefault()
    setToastText('');
    validatePassword(password)
    if (validatePassword(password) === "Password is valid.") {
      login({ email: email, password: password })
    } else {
      setToastText(validatePassword(password))
      setToastType("warning")
    }
  }


  useEffect(() => {
    if (isSuccess) {
      setToastText(data.message)
      setToastType("success")
      dispatch(setUser(data?.data))
      setTimeout(() => navigate('/dashboard'), 3000)
      // navigate('/dashboard')
    } else if (isError) {
      setToastText(error.data.message)
      setToastType("error")
    }
  }, [isSuccess, isError])

  function validatePassword(password) {
    // Check if password meets the minimum length requirement
    if (password.length < 8) {
      return "Password should be at least 8 characters long.";
    }
  
    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return "Password should contain at least one uppercase letter.";
    }
  
    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return "Password should contain at least one lowercase letter.";
    }
  
    // Check if password contains at least one number
    if (!/[0-9]/.test(password)) {
      return "Password should contain at least one number.";
    }
  
    // Check if password contains at least one special character
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password should contain at least one special character (!@#$%^&*).";
    }
  
    // Password has passed all validation checks
    return "Password is valid.";
  }
  
  // Usage example
  // const password = "MyPassword123!";
  // const validationResult = validatePassword(password);
  // console.log(validationResult);
  


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
            placeholder='seun@altcamp.com'
            className={userLoginStyle.email}
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
              className={userLoginStyle.password}
              onChange={e => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? eyeClosedIcon : eyeIcon}
              alt='eye icon'
              className={userLoginStyle.showPasswordIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {/* error ui */}
       <Toaster show={!!toastText} type={toastType} message={toastText} onClick={() => setToastText('')}/>
  
        <button
          className={userLoginStyle.loginButton}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Unlocking the door...' : 'Login'}
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
