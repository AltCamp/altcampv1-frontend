import { useState, useEffect } from 'react'

import OtpInput from 'react18-input-otp'

import verifyEmailStyle from './verifyemail.module.css'
import mobileLogo from '../../../../assets/general/AuthBlackLogo.svg'

import { useVerifyEmailMutation } from '../../../../app/slices/apiSlices/accountSlices/accountMutationSlice'

import { useVerifyOtpMutation } from '../../../../app/slices/apiSlices/accountSlices/accountMutationSlice'

export default function VerifyEmail () {
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleSetOtp = otp => {
    setOtp(otp)
  }

  const [
    verifyEmail,
    {
      data: verifyData,
      isSuccess: verifyEmailSuccess,
      isError: verifyEmailError,
      error: verifyEmailErrors
    }
  ] = useVerifyEmailMutation()

  const handleSendOtp = () => {
    verifyEmail()
    setOtpSent(true)
  }

  // useEffect(() => {
  //   verifyEmail()
  // }, [])

  const [
    verifyOtp,
    {
      data: verifyOtpData,
      isLoading: verifyOtpIsLoading,
      isSuccess: verifyOtpSuccess,
      isError: verifyOtpError,
      error: verifyOtpErrors
    }
  ] = useVerifyOtpMutation()

  const handleVerifyOtp = () => {
    verifyOtp({ token: otp })
  }

  useEffect(() => {
    if (verifyOtpSuccess) {
      window.location.href = '/dashboard'
    }
  }, [verifyOtpSuccess])

    // console.log(otp)
//   console.log(otpSent)

  return (
    <div className={verifyEmailStyle.container}>
      <div className={verifyEmailStyle.content}>
        <div className={verifyEmailStyle.mobileLogo}>
          <img src={mobileLogo} alt='altcamp mobile logo' className='' />
        </div>
        <h2 className={verifyEmailStyle.header}>Verify Email</h2>
        <p className={verifyEmailStyle.subHeader}>
          We emailed you a code. Please input it.
        </p>
        <div className={verifyEmailStyle.otpInput}>
          <OtpInput
            value={otp}
            onChange={handleSetOtp}
            numInputs={4}
            inputStyle={verifyEmailStyle.otpInputStyle}
            containerStyle={verifyEmailStyle.otpContainerStyle}
            isInputNum={true}
          />
        </div>
        <button
          className={verifyEmailStyle.submitButton}
          onClick={() => {
            handleVerifyOtp()
          }}
          disabled={otp.length < 4 || verifyOtpIsLoading}
        >
          {verifyOtpIsLoading ? 'Verifying...' : 'Verify'}
        </button>
        <p className={verifyEmailStyle.resendCode} onClick={handleSendOtp}>
          Resend Code
        </p>
      </div>
    </div>
  )
}
