import React, { useState } from 'react'
import fgtPassStyle from './forgotPassword.module.css'

export default function ForgotPassword () {
  const [renderOtpScreen, setRenderOtpScreen] = useState(false)

  return (
    <div className={fgtPassStyle.container}>
      <h2 className={fgtPassStyle.header}>Forgot Password</h2>
      {!renderOtpScreen && (
        <form action='' className={fgtPassStyle.form}>
          <p className={fgtPassStyle.subHeader}>Enter your email address</p>
          <div className={fgtPassStyle.formGroup}>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='seun@studybuddy.com'
              required
            />
          </div>
          <button
            className={fgtPassStyle.submitButton}
            onClick={() => setRenderOtpScreen(true)}
          >
            Send
          </button>
        </form>
      )}

      {renderOtpScreen && (
        <form action='' className={fgtPassStyle.form}>
          <p className={fgtPassStyle.subHeader}>
            Enter the OTP sent to your email
          </p>
          <div className={fgtPassStyle.formGroup}>
            <label htmlFor='otp'>OTP</label>
            <input
              type='text'
              name='otp'
              id='otp'
              placeholder='123456'
              required
            />
          </div>
          <button className={fgtPassStyle.submitButton}>Submit</button>
        </form>
      )}
    </div>
  )
}
