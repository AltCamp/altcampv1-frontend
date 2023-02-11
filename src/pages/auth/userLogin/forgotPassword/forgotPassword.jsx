import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import fgtPassStyle from './forgotPassword.module.css'
import eyeIcon from '../../../../assets/general/eye.svg'

export default function ForgotPassword () {
  const [renderOtpScreen, setRenderOtpScreen] = useState(false)
  const [verified, setVerified] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState('')

  const handleSetOtp = otp => {
    setOtp(otp)
  }

  return (
    <div className={fgtPassStyle.container}>
      {!verified && <h2 className={fgtPassStyle.header}>Forgot Password</h2>}
      {!renderOtpScreen && !verified && (
        <form action='' className={fgtPassStyle.form}>
          <p className={fgtPassStyle.subHeader}>
            A Four-Digit code will be sent to your mail
          </p>
          <div className={fgtPassStyle.formGroup}>
            <label htmlFor='email'>Enter your email address</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='seun@studybuddy.com'
              required
            />
          </div>
          <p className={fgtPassStyle.emailInstruction}>
            Make sure you enter the email address you used while registering
            your account
          </p>
          <button
            className={fgtPassStyle.submitButton}
            onClick={() => setRenderOtpScreen(true)}
          >
            Send Password Reset Code
          </button>
        </form>
      )}

      {renderOtpScreen && (
        <form action='' className={fgtPassStyle.form}>
          <p className={fgtPassStyle.subHeader}>
            We emailed you a code. Please input it.
          </p>
          <div className={fgtPassStyle.otpInput}>
            <OtpInput
              value={otp}
              onChange={handleSetOtp}
              numInputs={4}
              inputStyle={fgtPassStyle.otpInputStyle}
              containerStyle={fgtPassStyle.otpContainerStyle}
              isInputNum={true}
            />
          </div>
          <button
            className={fgtPassStyle.submitButton}
            onClick={() => {
              setVerified(true)
              setRenderOtpScreen(false)
            }}
          >
            Verify
          </button>
          <p className={fgtPassStyle.resendCode}>Resend Code</p>
        </form>
      )}

      {verified && !renderOtpScreen && (
        <form action='' className={fgtPassStyle.form}>
          <h2 className={fgtPassStyle.header}>Create new Password</h2>
          <p className={fgtPassStyle.subHeader}>
            Set a password you can remember
          </p>
          <div className={fgtPassStyle.passwordFormGroup}>
            <label htmlFor='password'>Enter your new password</label>
            <div className={fgtPassStyle.inputGroup}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                placeholder='********'
                required
              />
              <img
                src={eyeIcon}
                alt='eye icon'
                className={fgtPassStyle.showPasswordIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <div className={fgtPassStyle.passwordFormGroup}>
            <label htmlFor='confirmPassword'>Confirm your new password</label>
            <div className={fgtPassStyle.inputGroup}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='confirmPassword'
                id='confirmPassword'
                placeholder='********'
                required
              />
              <img
                src={eyeIcon}
                alt='eye icon'
                className={fgtPassStyle.showPasswordIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <button className={fgtPassStyle.submitButton}>Continue</button>
        </form>
      )}
    </div>
  )
}
