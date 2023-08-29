import { useState, useEffect } from 'react';

import OtpInput from 'react18-input-otp';

import mobileLogo from '../../../assets/general/AuthBlackLogo.svg';

import { useStartVerifyEmailMutation } from '../../../app/slices/apiSlices/accountSlice';

import { useVerifyEmailMutation } from '../../../app/slices/apiSlices/accountSlice';

import Toaster from '../../../components/Toaster/Toaster';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setVerified } from '../../../app/slices/generalSlices/userSlice';

export default function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [toastText, setToastText] = useState('');
  const [toastType, setToastType] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSetOtp = (otp) => {
    setOtp(otp);
  };

  const [
    startVerifyEmail,
    {
      data: startVerifyEmailData,
      isSuccess: startVerifyEmailSuccess,
      isLoading: startVerifyEmailLoading,
      isError: startVerifyEmailError,
      error: startVerifyEmailErrors,
    },
  ] = useStartVerifyEmailMutation();

  const handleStartVerifyEmail = () => {
    startVerifyEmail();
    setOtpSent(true);
  };

  const [verifyEmail, { data, isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();

  const handleVerifyEmail = () => {
    if (otp.length < 4) {
      return;
    }
    verifyEmail({
      requestId:
        startVerifyEmailData?.data.requestId ||
        localStorage.getItem('requestIdForEmail'),
      token: Number(otp),
    });
  };

  // if startVerifyEmailSuccess is true, then we have to set the requestId in localStorage
  // so that we can use it in the verifyEmail function
  useEffect(() => {
    if (startVerifyEmailSuccess) {
      localStorage.setItem(
        'requestIdForEmail',
        startVerifyEmailData?.data.requestId
      );
    }
  }, [startVerifyEmailSuccess]);

  useEffect(() => {
    if (isSuccess) {
      // remove saved values in localStorage
      localStorage.removeItem('requestIdForEmail');
      localStorage.removeItem('aboutToRegister');
      setToastText(data?.message);
      setToastType('success');
      dispatch(setVerified(true));
      setTimeout(() => {
        navigate('/dashboard/feed');
      }, 2000);
    }
    if (isError) {
      setToastText(error?.data.message);
      setToastType('error');
      setTimeout(() => {
        setToastType('');
        setToastText('');
      }, 2000);
    }
  }, [isSuccess, isError, data]);

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
          {startVerifyEmailSuccess
            ? `We have sent you a new code. Please input it.`
            : `We emailed you a code. Please input it.`}
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
            handleVerifyEmail();
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
        <p className="mt-3 flex w-fit gap-[0.5rem] self-center font-medium text-primary-800 sm:text-[0.875rem]">
          Didn&apos;t receive the code?{' '}
          <span
            onClick={handleStartVerifyEmail}
            className="underline-primary-800 cursor-pointer font-semibold underline underline-offset-2 hover:no-underline"
          >
            {startVerifyEmailLoading ? `Resending...` : `Resend`}
          </span>
        </p>
      </div>
    </div>
  );
}
