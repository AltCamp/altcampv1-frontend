import React, { useState } from "react";
import { Link } from "react-router-dom";
import mentorLogin from "./mentorLogin.module.css";
export default function MentorRegister() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));

  return (
    <div className={mentorLogin.container}>
      <h2 className={mentorLogin.heading}>Welcome Back</h2>
      <form action="">
        {!forgotPassword && (
          <div className={mentorLogin.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="seun@studybuddy.com"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              required
            />
            <input type="submit" value="Log In" className={mentorLogin.login} required />
            <Link
              onClick={() => setForgotPassword(true)}
            className={mentorLogin.forgotPassword}
            >
              Forgot Password
            </Link>
          </div>
        )}
        {forgotPassword && !newPassword && (
          <div className={mentorLogin.forgotPasswordForm}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="seun@studybuddy.com"
              required
            />

            <input
              onClick={() => setNewPassword(true)}
              type="submit"
              value="Send"
              className={mentorLogin.send}
              required
            />
          </div>
        )}
        {newPassword && (
          <div className={mentorLogin.tokenContainer}>
            <p>Enter the verification code sent to your email address</p>
            <div className={mentorLogin.passwordToken}>
              <div className={mentorLogin.token}>
                {otp.map((data, index) => {
                  return (
                    <input
                      type="text"
                      className={mentorLogin.otp}
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                    />
                  );
                })}
              </div>
              <input type="submit" value="Verify" className={mentorLogin.verify} required />
              <Link
                onClick={() => setNewPassword(true)}
                className={mentorLogin.resendToken}
              >
                Resend Code
              </Link>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
