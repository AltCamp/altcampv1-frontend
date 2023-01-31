import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import rglrStudRegStyle from './regularStudentRegister.module.css'

export default function RegularStudentRegister () {
  const [enterPassword, setEnterPassword] = useState(false)

  return (
    <div className={rglrStudRegStyle.container}>
      <h2 className={rglrStudRegStyle.header}>Register as a Regular Student</h2>
      <form action='' className={rglrStudRegStyle.form}>
        {!enterPassword && (
          <div className={rglrStudRegStyle.stepOne}>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                placeholder='Seun'
              />
            </div>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                placeholder='Ogunlana'
              />
            </div>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='seun@studybuddy.com'
              />
            </div>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor=''>Track</label>
              <select name='' id=''>
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
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='********'
              />
            </div>
            <div className={rglrStudRegStyle.formGroup}>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                placeholder='********'
              />
            </div>
            <button type='submit' className={rglrStudRegStyle.submitButton}>
              Create Account
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
