import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import userLoginStyle from './userLogin.module.css'
import eyeIcon from '../../../../assets/general/eye.svg'
import eyeClosedIcon from '../../../../assets/general/eyeclosed.svg'
import Toaster from '../../../components/Toaster/Toaster'

// import apiSLice hook
import { useLoginMutation } from '../../../../app/slices/apiSlices/authSlice'

import { useDispatch } from 'react-redux'

import { setUser } from '../../../../app/slices/generalSlices/userSlice'

export default function UserLogin () {
  const [showPassword, setShowPassword] = useState(false)

  const parentPath = useLocation().pathname.split('/')[1]
  // console.log(parentPath)

  const [toastText, setToastText] = useState('')
  const [toastType, setToastType] = useState("info")

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // console.log(email, password)
  const [login, { isSuccess, isLoading, data, isError, error }] =
    useLoginMutation()

    const handleLogin = e => {
      e.preventDefault()
      login({ email: email, password: password })
    }
  
    useEffect(() => {
      if (isSuccess) {
        setToastText(data.message)
        setToastType("success")
        dispatch(setUser(data?.data))
        setTimeout(() => navigate('/dashboard'), 3000)
        // navigate('/dashboard')
        navigate('/dashboard')
      } else if (isError) {
        setToastText(error.data.message)
        setToastType("error")
        setErrorText(error.data.message)
      }
    }, [isSuccess, isError])

 

  // console.log(data?.data)
  // console.log(error)

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
