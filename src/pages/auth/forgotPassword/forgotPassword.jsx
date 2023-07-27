import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForgotPasswordMutation } from '../../../app/slices/apiSlices/forgotPasswordSlice';

import Toaster from '../../../components/Toaster/Toaster';

export default function ForgotPassword() {
  const [email, setEmail] = useState();

  const [toastText, setToastText] = useState('');
  const [toastType, setToastType] = useState('info');

  const navigate = useNavigate();

  const [forgotPassword, { data, isLoading, isSuccess, isError, error }] =
    useForgotPasswordMutation();

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  // if otp is sent save the requestId in localstorage
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('requestIdForReset', data?.data.requestId);
      localStorage.setItem('email', email);
      setToastText(data?.message);
      setToastType('success');
      setTimeout(() => {
        navigate('/account/login/forgotpassword/enterotp');
      }, 1000);
    }
    if (isError) {
      setToastText(error?.message);
      setToastType('error');
    }
  }, [data]);

  return (
    <div className="mt-[3rem] flex flex-col justify-center gap-[1rem] ">
      <div className="mb-[2.5em] flex flex-col gap-[1rem]">
        <h2 className="text-center text-[2rem] font-semibold sm:text-[1.5rem]">
          Forgot Password
        </h2>
        <p className="text-center">
          A Four-Digit code will be sent to your mail
        </p>
      </div>
      <form
        action=""
        className="flex flex-col gap-[2rem]"
        onSubmit={handleSubmitEmail}
      >
        <div className="form-group mt-[3rem]">
          <label htmlFor="email">
            Enter the email address you registered with
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="seun@altcamp.com"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="auth-btn" disabled={isLoading}>
          Send Password Reset Code
        </button>
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
