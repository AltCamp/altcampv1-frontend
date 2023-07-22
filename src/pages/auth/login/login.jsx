import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import eyeIcon from '../../../assets/general/eye.svg';
import eyeClosedIcon from '../../../assets/general/eyeclosed.svg';

// import apiSLice hook
import { useLoginMutation } from '../../../app/slices/apiSlices/authSlice';

import { useDispatch } from 'react-redux';

import { setUser } from '../../../app/slices/generalSlices/userSlice';
import Toaster from '../../../components/Toaster/Toaster';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const parentPath = useLocation().pathname.split('/')[1];

  const [toastText, setToastText] = useState('');
  const [toastType, setToastType] = useState('info');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [login, { isSuccess, isLoading, data, isError, error }] =
    useLoginMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email: email, password: password });
  };

  useEffect(() => {
    if (isSuccess) {
      setToastText(data.message);
      setToastType('success');
      dispatch(setUser(data?.data));
      // remove requestIdForEmail, otp, requestIdForReset and email from localStorage
      localStorage.removeItem('requestIdForEmail');
      localStorage.removeItem('otp');
      localStorage.removeItem('requestIdForReset');
      localStorage.removeItem('email');
      setTimeout(() => navigate('/dashboard'), 2000);
    } else if (isError) {
      setToastText(error?.message);
      setToastType('error');
      setTimeout(() => setToastText(''), 3000);
    }
  }, [isSuccess, isError]);

  return (
    <div className="mt-12 flex flex-col justify-center gap-8">
      <h2 className="mb-6 text-center text-[2rem] font-semibold sm:text-[1.5rem]">
        Welcome Back
      </h2>
      <form className="flex flex-col gap-[2.5rem] " onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
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

        {/* error ui */}
        <Toaster
          show={!!toastText}
          type={toastType}
          message={toastText}
          handleClose={() => setToastText('')}
        />

        <button className="auth-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Unlocking the door...' : 'Login'}
        </button>
        <Link
          to={`/${parentPath}/login/forgotpassword`}
          className="w-fit cursor-pointer self-end text-right text-[0.875rem] font-normal"
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
