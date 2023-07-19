import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import OtpInput from 'react18-input-otp';

import { useVerifyForgotPasswordOtpMutation } from '../../../app/slices/apiSlices/forgotPasswordSlice';

import { useForgotPasswordMutation } from '../../../app/slices/apiSlices/forgotPasswordSlice';

import Toaster from '../../../components/Toaster/Toaster';

export default function EnterOtp() {
  const [otp, setOtp] = useState('');

  const [toastText, setToastText] = useState('');
  const [toastType, setToastType] = useState('info');

  const navigate = useNavigate();

  const handleSetOtp = (otp) => {
    setOtp(otp);
  };

  const [
    verifyForgotPasswordOtp,
    {
      data: verifyForgotPasswordOtpData,
      isSuccess: verifyForgotPasswordOtpIsSuccess,
      isLoading: verifyForgotPasswordOtpIsLoading,
      isError: verifyForgotPasswordOtpIsError,
      error: verifyForgotPasswordOtpError,
    },
  ] = useVerifyForgotPasswordOtpMutation();

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      return;
    }
    console.log(localStorage.getItem('requestIdForReset'));
    verifyForgotPasswordOtp({
      requestId: localStorage.getItem('requestIdForReset'),
      token: otp,
    });
  };

  useEffect(() => {
    if (verifyForgotPasswordOtpIsSuccess) {
      // save otp in localStorage
      localStorage.setItem('otp', otp);
      setToastText(verifyForgotPasswordOtpData?.message);
      setToastType('success');
      setTimeout(() => {
        navigate('/account/login/forgotpassword/resetpassword');
      }, 1000);
    }
    if (verifyForgotPasswordOtpIsError) {
      setToastText(verifyForgotPasswordOtpError?.message);
      setToastType('error');
    }
  }, [verifyForgotPasswordOtpData]);

  const [
    forgotPassword,
    {
      data: forgotPasswordData,
      isSuccess: forgotPasswordIsSuccess,
      isLoading: forgotPasswordIsLoading,
      isError: forgotPasswordIsError,
      error: forgotPasswordError,
    },
  ] = useForgotPasswordMutation();

  const handleResendCode = () => {
    forgotPassword(localStorage.getItem('email'));
  };

  useEffect(() => {
    if (forgotPasswordIsSuccess) {
      setToastText(forgotPasswordData?.message);
      setToastType('success');
    }
    if (forgotPasswordIsError) {
      setToastText(forgotPasswordError?.message);
      setToastType('error');
    }
  }, [forgotPasswordData]);

  return (
    <div className="mt-[3rem] flex flex-col justify-center gap-[1rem]">
      <div className="mb-[2.5em] flex flex-col gap-[1rem]">
        <h2 className="text-center text-[2rem] font-semibold sm:text-[1.5rem]">
          Forgot Password
        </h2>
        <p className="text-center">We emailed you a code. Please input it.</p>
      </div>
      <form
        action=""
        className="flex flex-col gap-[2rem] xs:gap-[1.5rem]"
        onSubmit={handleSubmitOtp}
      >
        <div className="mt-[3rem] flex flex-col gap-[1rem]">
          <OtpInput
            value={otp}
            onChange={handleSetOtp}
            numInputs={4}
            inputStyle="otp-input"
            containerStyle="otp-input-container"
            isInputNum={true}
          />
        </div>
        <button
          className="auth-btn"
          disabled={verifyForgotPasswordOtpIsLoading}
        >
          Verify
        </button>
        <p className="flex w-fit gap-[0.5rem] self-center font-medium text-primary-800">
          Didn&apos;t receive the code?{' '}
          <span
            onClick={handleResendCode}
            className="underline-primary-800 cursor-pointer font-semibold underline underline-offset-2 hover:no-underline"
          >
            Resend
          </span>
        </p>
      </form>
      <Toaster
        show={!!toastText}
        type={toastType}
        message={toastText}
        handleClose={() => setToastText('')}
      />
    </div>
  );
}
