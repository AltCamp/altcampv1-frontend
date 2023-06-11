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

  const [errorText, setErrorText] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  
  const [login, { isSuccess, isLoading, data, isError, error }] =
    useLoginMutation()

  const handleLogin = e => {
    e.preventDefault()
    setErrorText('');
    login({ email: email, password: password })
  }


  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data?.data))
      navigate('/dashboard')
    } else if (isError) {
      setErrorText(error.data.message)
    }
  }, [isSuccess, isError])

 


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
       <Toaster show={!!errorText} type="error" message={errorText}/>
  
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
