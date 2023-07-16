import React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import OtpInput from 'react18-input-otp';

export default function EnterOtp() {
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const handleSetOtp = (otp) => {
    setOtp(otp);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      return;
    }
    navigate('/account/login/forgotpassword/resetpassword');
  };

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
        <button className="auth-btn">Verify</button>
        <p className="w-fit cursor-pointer self-center font-medium text-primary-800">
          Resend Code
        </p>
      </form>
    </div>
  );
}
