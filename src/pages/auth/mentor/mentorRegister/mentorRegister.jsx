import React, { useState, useEffect } from "react";
import mentorRegister from "./mentorRegister.module.css";
import eyeIcon from "../../../../assets/general/eye.svg";
import eyeClosedIcon from "../../../../assets/general/eyeclosed.svg";
import { useRegisterMentorMutation } from "../../../../app/slices/apiSlices/authSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setUser } from "../../../../app/slices/generalSlices/userSlice";
export default function MentorRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerMentor, { isSuccess, isLoading, data, error, isError }] =
    useRegisterMentorMutation();

  const handleRegisterMentor = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
      registerMentor({
        email,
        password,
        firstname: firstName,
        lastname: lastName,
        track,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data?.data));
      navigate("/dashboard");
    }
    if (isError) {
      setErrorMessage(error.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <div className={mentorRegister.mentorContainer}>
      <h2 className={mentorRegister.mentorHeading}>Register as a Mentor</h2>

      <form className={mentorRegister.mentorForm} onSubmit={handleRegisterMentor}>
        <div className={mentorRegister.mentorName}>
          <div className={mentorRegister.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Seun"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={mentorRegister.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Akingboye"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={mentorRegister.formGroup}>
            <label htmlFor="track">Track</label>
        <select
          name="track"
          id="track"
          onChange={(e) => setTrack(e.target.value)}
          required
          className={mentorRegister.select}
        >
          <option value="">Select Track</option>
          <option value="Product Design">Product Design</option>
          <option value="Frontend">Frontend Engineering</option>
          <option value="Backend">Backend Engineering</option>
          <option value="Cloud">Cloud Engineering</option>
          <option value="Data Analysis"> Data Analysis</option>
          <option value="Data Engineering">Data Engineering</option>
          <option value="Data Science">Data Science</option>
          <option value="Product Management">Product Management</option>
          <option value="Producting Marketing">Producting Marketing</option>
        </select>
        
      </div>
          <div className={mentorRegister.formGroup}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="seun@studybuddy.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className={mentorRegister.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={mentorRegister.inputGroup}>
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={togglePassword ? eyeClosedIcon : eyeIcon}
              alt="show password"
              className={mentorRegister.showPasswordIcon}
              onClick={() => setTogglePassword(!togglePassword)}
            />
          </div>
        </div>
        <div className={mentorRegister.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className={mentorRegister.inputGroup}>
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              id="confirmPassword"
              placeholder=""
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <img
              src={togglePassword ? eyeClosedIcon : eyeIcon}
              alt="show password"
              className={mentorRegister.showPasswordIcon}
              onClick={() => setTogglePassword(!togglePassword)}
            />
          </div>
        </div>

        {errorMessage && (
          <div className={mentorRegister.errorMessage}>
            <p>{errorMessage}</p>
          </div>
        )}

        <button type="submit" className={mentorRegister.continueButton}disabled={isLoading}> {isLoading ? "Unlocking the door..." : "Create Account"} </button>
        
      </form>
    </div>
  );
}
