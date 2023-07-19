import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import eyeIcon from '../../../assets/general/eye.svg';
import eyeClosedIcon from '../../../assets/general/eyeclosed.svg';

import { useResetPasswordMutation } from '../../../app/slices/apiSlices/forgotPasswordSlice';

import Toaster from '../../../components/Toaster/Toaster';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [toastText, setToastText] = useState('');
  const [toastType, setToastType] = useState('info');

  const navigate = useNavigate();

  const [
    resetPassword,
    {
      data: resetPasswordData,
      isSuccess: resetPasswordIsSuccess,
      isLoading: resetPasswordIsLoading,
      isError: resetPasswordIsError,
      error: resetPasswordError,
    },
  ] = useResetPasswordMutation();

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      return;
    }
    resetPassword({
      requestId: localStorage.getItem('requestIdForReset'),
      token: localStorage.getItem('otp'),
      password: password,
      retypePassword: retypePassword,
    });
  };

  useEffect(() => {
    if (resetPasswordIsSuccess) {
      // remove saved values in localstorage
      localStorage.removeItem('otp');
      localStorage.removeItem('requestIdForReset');
      localStorage.removeItem('email');
      setToastText(resetPasswordData?.message);
      setToastType('success');
      setTimeout(() => {
        navigate('/account/login');
      }, 1000);
    }
    if (resetPasswordIsError) {
      setToastText(resetPasswordError?.message);
      setToastType('error');
    }
  }, [resetPasswordData]);

  return (
    <div className="mt-[3rem] flex flex-col justify-center gap-[1rem]">
      <form
        action=""
        className="flex flex-col gap-[2rem]"
        onSubmit={handleSubmitNewPassword}
      >
        <h2 className="text-center text-[2rem] font-semibold sm:text-[1.5rem]">
          Create new Password
        </h2>
        <p className="text-center">Set a password you can remember</p>
        <div className="form-group">
          <label htmlFor="password">Enter your new password</label>
          <div className="password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="********"
              className="password-input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? eyeClosedIcon : eyeIcon}
              alt="eye icon"
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="label">
            Confirm your new password
          </label>
          <div className="password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="********"
              className="password-input"
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? eyeClosedIcon : eyeIcon}
              alt="eye icon"
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button className="auth-btn" disabled={resetPasswordIsLoading}>
          Continue
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
