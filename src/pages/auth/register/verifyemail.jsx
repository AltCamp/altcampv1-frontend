import { useState, useEffect } from 'react';

import OtpInput from 'react18-input-otp';

import mobileLogo from '../../../assets/general/AuthBlackLogo.svg';

import { useVerifyEmailMutation } from '../../../app/slices/apiSlices/accountSlices/accountMutationSlice';

import { useVerifyOtpMutation } from '../../../app/slices/apiSlices/accountSlices/accountMutationSlice';

import Toaster from '../../../components/Toaster/Toaster';

import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [toastText, setToastText] = useState('');
  const [toastType, setToastType] = useState('info');

  const navigate = useNavigate();
  const handleSetOtp = (otp) => {
    setOtp(otp);
  };

  const [
    verifyEmail,
    {
      data: verifyData,
      isSuccess: verifyEmailSuccess,
      isError: verifyEmailError,
      error: verifyEmailErrors,
    },
  ] = useVerifyEmailMutation();

  const handleSendOtp = () => {
    verifyEmail();
    setOtpSent(true);
  };

  const [
    verifyOtp,
    {
      data: verifyOtpData,
      isLoading: verifyOtpIsLoading,
      isSuccess: verifyOtpSuccess,
      isError: verifyOtpError,
      error: verifyOtpErrors,
    },
  ] = useVerifyOtpMutation();

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      return;
    }
    verifyOtp({ token: otp });
  };

  useEffect(() => {
    if (verifyOtpSuccess) {
      setToastText(verifyOtpData.message);
      setToastType('success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
    if (verifyOtpError) {
      setToastText(verifyOtpErrors?.data.message);
      setToastType('error');
    }
  }, [verifyOtpSuccess, verifyOtpError]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex h-[35rem] w-[30rem] flex-col items-center rounded-[4px] p-[1rem] shadow-[-1px_0px_13px_0px_rgba(0,0,0,0.18)] sm:h-[70%] sm:w-[90%] sm:rounded-none sm:p-0 sm:shadow-none ">
        <div className="flex p-[2rem]">
          <img src={mobileLogo} alt="altcamp mobile logo" className="" />
        </div>
        <h2 className="text-center text-[2rem] font-semibold sm:text-[1.5rem]">
          Verify Email
        </h2>
        <p className="mb-[2.5rem] text-center sm:text-[0.875rem] ">
          We emailed you a code. Please input it.
        </p>
        <div className="mt-[3rem] flex w-full flex-col gap-[1rem]">
          <OtpInput
            value={otp}
            onChange={handleSetOtp}
            numInputs={4}
            inputStyle="otp-input"
            containerStyle="otp-input-container"
            isInputNum={true}
          />
        </div>
        <Toaster
          show={!!toastText}
          type={toastType}
          message={toastText}
          handleClose={() => setToastText('')}
        />
        <button
          className="auth-btn"
          onClick={() => {
            handleVerifyOtp();
          }}
          disabled={verifyOtpIsLoading}
        >
          {verifyOtpIsLoading ? 'Verifying...' : 'Verify'}
        </button>
        <p
          className="mt-3 w-fit cursor-pointer self-center font-medium text-primary-800 sm:text-[0.875rem]"
          onClick={handleSendOtp}
        >
          Resend Code
        </p>
      </div>
    </div>
  );
}
