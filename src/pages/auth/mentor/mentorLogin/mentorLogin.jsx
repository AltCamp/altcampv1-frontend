import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./mentorLogin.css";
export default function MentorRegister() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));

  return (
    <div className="mentorLoginContainer">
      <h2 className="mentorLoginHeading">Welcome Back</h2>
      <form action="">
        {!forgotPassword && (
          <div className="mentorLoginForm">
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
            <input type="submit" value="Log In" className="login" required />
            <Link
              onClick={() => setForgotPassword(true)}
              className="setForgotPassword"
            >
              Forgot Password
            </Link>
          </div>
        )}
        {forgotPassword && !newPassword && (
          <div className="mentorForgotPasswordForm">
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
              className="send"
              required
            />
          </div>
        )}
        {newPassword && (
          <div className="passwordTokenContainer">
            <p>Enter the verification code sent to your email address</p>
            <div className="passwordToken">
              <div className="mentorToken">
                {otp.map((data, index) => {
                  return (
                    <input
                      type="text"
                      className="mentorOtp"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                    />
                  );
                })}
              </div>
              <input type="submit" value="Verify" className="verify" required />
              <Link
                onClick={() => setNewPassword(true)}
                className="resendToken"
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
