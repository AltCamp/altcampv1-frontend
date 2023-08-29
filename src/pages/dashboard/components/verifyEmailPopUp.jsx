import { useState, useEffect } from 'react';

import OtpInput from 'react18-input-otp';

import { useStartVerifyEmailMutation } from '../../../app/slices/apiSlices/accountSlice';

import { useVerifyEmailMutation } from '../../../app/slices/apiSlices/accountSlice';

import { useSelector, useDispatch } from 'react-redux';

import { setVerified } from '../../../app/slices/generalSlices/userSlice';

import Toaster from '../../../components/Toaster/Toaster';

import wave from '../../../assets/icons/wave.png';

import { CloseCircle } from 'iconsax-react';

export default function VerifyEmailPopUp({ queryError, setQueryError }) {
  const { user } = useSelector((state) => state?.user);

  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');

  const [toastText, setToastText] = useState('');
  const [toastType, setToastType] = useState('info');

  const handleSetOtp = (otp) => {
    setOtp(otp);
  };

  const [
    startVerifyEmail,
    {
      data: startVerifyEmailData,
      isSuccess: startVerifyEmailSuccess,
      isLoading: startVerifyEmailIsLoading,
      isError: startVerifyEmailError,
      error: startVerifyEmailErrors,
    },
  ] = useStartVerifyEmailMutation();

  const handleStartVerifyEmail = () => {
    startVerifyEmail();
  };

  const [
    verifyEmail,
    {
      data: verifyEmailData,
      isLoading: verifyEmailIsLoading,
      isSuccess: verifyEmailSuccess,
      isError: verifyEmailError,
      error: verifyEmailErrors,
    },
  ] = useVerifyEmailMutation();

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
    if (verifyEmailSuccess) {
      // remove saved values in localStorage
      localStorage.removeItem('requestIdForEmail');
      setToastText(verifyEmailData.message);
      setToastType('success');
      dispatch(setVerified(true));
      setTimeout(() => {
        setQueryError('');
      }, 2000);
    }
    if (verifyEmailError) {
      setToastText(verifyEmailErrors?.data.message);
      setToastType('error');
      setTimeout(() => {
        setToastText('');
      }, 2000);
    }
  }, [verifyEmailSuccess, verifyEmailError]);

  const handleClosePopUp = () => {
    setQueryError('');
  };

  return (
    <>
      {queryError === 'Email is not verified' && (
        <div
          className="fixed left-0 top-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center
        bg-[#00000080]"
        >
          <div
            className={`relative flex h-[35rem] w-[30rem] flex-col items-center rounded-[4px] bg-white p-[1rem] shadow-[-1px_0px_13px_0px_rgba(0,0,0,0.18)] sm:h-[80%] sm:w-[90%] sm:rounded-none sm:p-3 sm:shadow-none
        ${!startVerifyEmailData && 'h-fit sm:h-fit '} 
        `}
          >
            <CloseCircle
              size={20}
              className="absolute -top-8 cursor-pointer text-white"
              onClick={handleClosePopUp}
            />
            <div className="flex flex-col items-center gap-2 p-[2rem] ">
              <p className="">
                Hi{' '}
                <img
                  src={wave}
                  alt="wave"
                  className="inline-block h-[1.5rem] w-[1.5rem]"
                />{' '}
                {','} <span className="font-semibold">{user?.firstName}</span>
              </p>

              <div className="text-center text-sm">
                {startVerifyEmailSuccess
                  ? `Great! Now verify your email address by entering the code we sent to your inbox. Once you do, you'll be able to play your part right away.`
                  : `We're thrilled you're interested in declaring your presence here, verify your email address by clicking the button below to request for the code.`}
              </div>
            </div>
            {startVerifyEmailSuccess ? (
              <>
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
                <button
                  className="auth-btn"
                  onClick={() => {
                    handleVerifyEmail();
                  }}
                  disabled={verifyEmailIsLoading}
                >
                  {verifyEmailIsLoading ? 'Verifying...' : 'Verify'}
                </button>
                <p className="mt-3 flex w-fit gap-[0.5rem] self-center font-medium text-primary-800 sm:text-[0.875rem]">
                  Didn&apos;t receive the code?{' '}
                  <span
                    onClick={handleStartVerifyEmail}
                    className="underline-primary-800 cursor-pointer font-semibold underline underline-offset-2 hover:no-underline"
                  >
                    {startVerifyEmailIsLoading ? `Resending...` : `Resend`}
                  </span>
                </p>
              </>
            ) : (
              <button
                className="auth-btn w-fit px-3"
                onClick={() => {
                  handleStartVerifyEmail();
                }}
                disabled={startVerifyEmailIsLoading}
              >
                {startVerifyEmailIsLoading
                  ? 'Requesting...'
                  : 'Request for code'}
              </button>
            )}
          </div>

          <Toaster
            show={!!toastText}
            type={toastType}
            message={toastText}
            handleClose={() => setToastText('')}
          />
        </div>
      )}
    </>
  );
}
