import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import registerStyles from './register.module.css'
import eyeIcon from '../../../assets/general/eye.svg'
import eyeClosedIcon from '../../../assets/general/eyeclosed.svg'

import { setUser } from '../../../app/slices/generalSlices/userSlice'

import { useDispatch } from 'react-redux'

import { useRegisterMutation } from '../../../app/slices/apiSlices/authSlice'

import { useNavigate } from 'react-router-dom'

export default function Register () {
  const [toggleShowPassword, setToggleShowPassword] = useState(false)
  const [screenWidthState, setScreenWidthState] = useState(false)

  // user data state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [category, setCategory] = useState('Student')
  const [email, setEmail] = useState('')
  const [altSchoolId, setAltSchoolId] = useState('')
  const [track, setTrack] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorText, setErrorText] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [register, { data, isLoading, isSuccess, isError, error }] =
    useRegisterMutation()

  const handleStudentRegister = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match')
    } else {
      setErrorText('')
      if (category === 'Student') {
        register({
          firstName,
          lastName,
          email,
          password,
          track,
          category,
          altSchoolId
        })
      } else {
        register({
          firstName,
          lastName,
          email,
          password,
          track,
          category
        })
      }
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

  useEffect(() => {
    const media = window.innerWidth
    window.addEventListener('resize', () => {
      setScreenWidthState(media < 600)
    })
  }, [])

  return (
    <div className={registerStyles.container}>
      <h2 className={registerStyles.header}>Create Account</h2>
      <form
        action=''
        className={registerStyles.form}
        onSubmit={handleStudentRegister}
      >
        <div
          className={`${registerStyles.formGroup} ${registerStyles.firstName}`}
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
          className={`${registerStyles.formGroup} ${registerStyles.lastName}`}
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
          className={`${registerStyles.formGroup} ${registerStyles.category}`}
        >
          <label htmlFor=''>Category</label>
          <select
            name=''
            id=''
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value='Student'>AltSchooler</option>
            <option value='Mentor'>Mentor</option>
          </select>
        </div>
        <motion.div
          className={`${registerStyles.formGroup} ${registerStyles.track}`}
          initial={{ gridColumn: '1 / 2' }}
          animate={{ gridColumn: category == 'Student' ? '1 / 2' : '1 / 3' }}
        >
          <label htmlFor=''>Track</label>
          <select
            name=''
            id=''
            onChange={e => setTrack(e.target.value)}
            required
          >
            <option value=''>Select Track</option>
            <option value='Backend Engineering'>Backend Engineering</option>
            <option value='Cloud Engineering'>Cloud Engineering</option>
            <option value='Data Analysis'>Data Analysis</option>
            <option value='Data Engineering'>Data Engineering</option>
            <option value='Data Science'>Data Science</option>
            <option value='Frontend Engineering'>Frontend Engineering</option>
            <option value='Product Design'>Product Design</option>
            <option value='Product Management'>Product Management</option>
            <option value='Product Marketing'>Product Marketing</option>
          </select>
        </motion.div>
        <AnimatePresence>
          {category == 'Student' && (
            <motion.div
              className={`${registerStyles.formGroup} ${registerStyles.matric}`}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <label htmlFor='matric'>Altschool Student Number</label>
              <input
                type='text'
                name='matric'
                id='matric'
                placeholder='ALT/SOP/022/0001'
                onChange={e => setAltSchoolId(e.target.value)}
                pattern="^ALT/SO[EPD]/02[2-9]/[0-9]{0,4}$"
                required
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={`${registerStyles.formGroup} ${registerStyles.email}`}>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='seun@altcamp.com'
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div
          className={`${registerStyles.formGroup} ${registerStyles.password}`}
        >
          <label htmlFor='password'>Password</label>
          <div className={registerStyles.inputGroup}>
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
              className={registerStyles.showPasswordIcon}
              onClick={() => setToggleShowPassword(!toggleShowPassword)}
            />
          </div>
        </div>
        <div
          className={`${registerStyles.formGroup} ${registerStyles.confirmPassword}`}
        >
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className={registerStyles.inputGroup}>
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
              className={registerStyles.showPasswordIcon}
              onClick={() => setToggleShowPassword(!toggleShowPassword)}
            />
          </div>
        </div>

        {/* error ui */}
        {errorText && (
          <div className={registerStyles.errorText}>
            <p>{errorText}</p>
          </div>
        )}

        <button
          type='submit'
          className={registerStyles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Unlocking the door...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}
