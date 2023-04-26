import React, { useState } from 'react'
import mentorRegister from './mentorRegister.module.css'
import eyeIcon from '../../../../assets/general/eye.svg'

import { useRegisterMentorMutation } from '../../../../app/slices/apiSlices/authSlice'

export default function MentorRegister () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [track, setTrack] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [togglePassword, setTogglePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [registerMentor, { isSuccess, isLoading, data, error }] =
    useRegisterMentorMutation()

  const handleRegisterMentor = e => {
    e.preventDefault()
    registerMentor({
      email: email,
      password: password,
      firstname: firstName,
      lastname: lastName,
      track: track
    })
  }

  // console.log(data, error)

  // console.log({
  //   'firstname': firstName,
  //   'lastname': lastName,
  //   'track': track,
  //   'email': email,
  //   'password': password,
  //   'confirmpassword': confirmPassword
  // })

  return (
    <div className={mentorRegister.container}>
      <h2 className={mentorRegister.heading}>Register as a Mentor</h2>

      <form
       className='form'
       onSubmit={handleRegisterMentor}
       >
        {!togglePassword && (
          <div className={mentorRegister.formGroup}>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              name='firstName'
              id='firstName'
              placeholder='Seun'
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              name='lastName'
              id='lastName'
              placeholder='Akingboye'
              onChange={e => setLastName(e.target.value)}
              required
            />
            <label htmlFor='track'>Track</label>
            <select
              name='track'
              id='track'
              onChange={e => setTrack(e.target.value)}
              required
            >
              <option value='Product Design'>Product Design</option>
              <option value='Frontend'>Frontend</option>
              <option value='Backend'>Backend</option>
              <option value='Cloud'>Cloud</option>
            </select>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='seun@studybuddy.com'
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div className={mentorRegister.continueButton}>
              <input
                onClick={() => setTogglePassword(true)}
                type='submit'
                value='Continue'
                className={mentorRegister.continue}
                required
              />
            </div>
          </div>
        )}

        {togglePassword && (
          <div className={mentorRegister.setPasswordContainer}>
            <div className={mentorRegister.setPassword}>
              <label htmlFor='password'>Password</label>
              <div className={mentorRegister.inputGroup}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='********'
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <img
                  src={eyeIcon}
                  alt='eye icon'
                  className={mentorRegister.showPasswordIcon}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <div className={mentorRegister.inputGroup}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='********'
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                <img
                  src={eyeIcon}
                  alt='eye icon'
                  className={mentorRegister.showPasswordIcon}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <input
                type='submit'
                value={isLoading ? 'Creating Account...' : 'Create Account'}
                className={mentorRegister.create}
                disabled={isLoading}
                required
              />
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
