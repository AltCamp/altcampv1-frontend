import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import rglrStudRegStyle from './regularStudentRegister.module.css'
import eyeIcon from '../../../../assets/general/eye.svg'
import eyeClosedIcon from '../../../../assets/general/eyeclosed.svg'

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
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorText, setErrorText] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [registerStudent, { data, isLoading, isSuccess, isError, error }] =
    useRegisterStudentMutation()

  const handleStudentRegister = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match')
    } else {
      setErrorText('')
      registerStudent({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        track,
        matric
      })
    }
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
  }, [isSuccess, isError])

  return (
    <div className={rglrStudRegStyle.container}>
      <h2 className={rglrStudRegStyle.header}>Register as an AltSchooler</h2>
      <form
        action=''
        className={rglrStudRegStyle.form}
        onSubmit={handleStudentRegister}
      >
        <div
          className={`${rglrStudRegStyle.formGroup} ${rglrStudRegStyle.firstName}`}
        >
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
        <div
          className={`${rglrStudRegStyle.formGroup} ${rglrStudRegStyle.lastName}`}
        >
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
        <div
          className={`${rglrStudRegStyle.formGroup} ${rglrStudRegStyle.track}`}
        >
          <label htmlFor=''>Track</label>
          <select
            name=''
            id=''
            onChange={e => setTrack(e.target.value)}
            required
          >
            <option value=''>Select Track</option>
            <option value='backend engineering'>Backend Engineering</option>
            <option value='data science'>Data Science</option>
            <option value='frontend engineering'>Frontend Engineering</option>
            <option value='product design'>Product Design</option>
            <option value='product management'>Product Management</option>
            <option value='product marketing'>Product Marketing</option>
          </select>
        </div>
        <div
          className={`${rglrStudRegStyle.formGroup} ${rglrStudRegStyle.matric}`}
        >
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
        <div
          className={`${rglrStudRegStyle.formGroup} ${rglrStudRegStyle.email}`}
        >
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
        <div
          className={`${rglrStudRegStyle.formGroup} ${rglrStudRegStyle.password}`}
        >
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
              src={toggleShowPassword ? eyeClosedIcon : eyeIcon}
              alt='showPassword'
              className={rglrStudRegStyle.showPasswordIcon}
              onClick={() => setToggleShowPassword(!toggleShowPassword)}
            />
          </div>
        </div>
        <div
          className={`${rglrStudRegStyle.formGroup} ${rglrStudRegStyle.confirmPassword}`}
        >
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
              src={toggleShowPassword ? eyeClosedIcon : eyeIcon}
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
      </form>
    </div>
  )
}
