import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import rglrStudRegStyle from './regularStudentRegister.module.css'
import eyeIcon from '../../../../assets/general/eye.svg'

import { setUser } from '../../../../app/slices/generalSlices/userSlice'

import { useDispatch } from 'react-redux'

import { useRegisterStudentMutation } from '../../../../app/slices/apiSlices/authSlice'

import { useNavigate } from 'react-router-dom'

export default function RegularStudentRegister () {
  const [enterPassword, setEnterPassword] = useState(false)
  const [toggleShowPassword, setToggleShowPassword] = useState(false)

  // user data state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [matric, setMatric] = useState('')
  const [track, setTrack] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassowrd, setConfirmPassword] = useState('')

  const [errorText, setErrorText] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [registerStudent, { data, isLoading, isSuccess, isError, error }] =
    useRegisterStudentMutation()

  const handleStudentRegister = e => {
    e.preventDefault()
    registerStudent({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      track,
      matric
    })
  }

  useEffect(() => {
    if (isSuccess) {
      // console.log(data)
      dispatch(setUser(data?.data))
      navigate('/dashboard')
    }
    if (isError) {
      setErrorText(error.data.message)
    }
    if (
      firstName == '' ||
      lastName == '' ||
      email == '' ||
      matric == '' ||
      track == '' ||
      password == '' ||
      confirmPassowrd == ''
    ) {
      setErrorText('Please fill all fields')
    }
  }, [isSuccess, isError])

  return (
    <div className={rglrStudRegStyle.container}>
      <h2 className={rglrStudRegStyle.header}>Register as an AltSchooler</h2>
      <form
        action=''
        className={rglrStudRegStyle.form}
        onSubmit={handleStudentRegister}
      >
        {!enterPassword && (
          <div className={rglrStudRegStyle.stepOne}>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                placeholder='Seun'
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                placeholder='Ogunlana'
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='seun@studybuddy.com'
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='matric'>Altschool Student Number</label>
              <input
                type='text'
                name='matric'
                id='matric'
                placeholder='ALT/NIN/2220'
                onChange={e => setMatric(e.target.value)}
                required
              />
            </div>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor=''>Track</label>
              <select name='' id='' onChange={e => setTrack(e.target.value)}>
                <option value=''>Select Track</option>
                <option value='product design'>Product Design</option>
                <option value='frontend engineering'>
                  Frontend Engineering
                </option>
                <option value='backend engineering'>Backend Engineering</option>
              </select>
            </div>
            <button
              className={rglrStudRegStyle.continueButton}
              onClick={() => setEnterPassword(true)}
            >
              Continue
            </button>
          </div>
        )}

        {enterPassword && (
          <div className={rglrStudRegStyle.stepTwo}>
            <div className={rglrStudRegStyle.passwordFormGroup}>
              <label htmlFor='password'>Password</label>
              <div className={rglrStudRegStyle.inputGroup}>
                <input
                  type={toggleShowPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder=''
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <img
                  src={eyeIcon}
                  alt='showPassword'
                  className={rglrStudRegStyle.showPasswordIcon}
                  onClick={() => setToggleShowPassword(!toggleShowPassword)}
                />
              </div>
            </div>
            <div className={rglrStudRegStyle.passwordFormGroup}>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <div className={rglrStudRegStyle.inputGroup}>
                <input
                  type={toggleShowPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  id='confirmPassword'
                  placeholder=''
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                <img
                  src={eyeIcon}
                  alt='showPassword'
                  className={rglrStudRegStyle.showPasswordIcon}
                  onClick={() => setToggleShowPassword(!toggleShowPassword)}
                />
              </div>
            </div>

            {/* error ui */}
            {errorText && (
              <div className={rglrStudRegStyle.errorText}>
                <p>{errorText}</p>
              </div>
            )}

            <button
              type='submit'
              className={rglrStudRegStyle.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Unlocking the door...' : 'Create Account'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
