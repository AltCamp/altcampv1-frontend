import { useState } from 'react';

import eyeIcon from '../../../assets/general/eye.svg';
import eyeClosedIcon from '../../../assets/general/eyeclosed.svg';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-[3rem] flex flex-col justify-center gap-[1rem]">
      <form action="" className="flex flex-col gap-[2rem]">
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
        <button className="auth-btn">Continue</button>
      </form>
    </div>
  );
}
