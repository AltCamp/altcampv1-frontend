import React, { useState } from "react";
import mentorRegister from "./mentorRegister.module.css";

export default function MentorRegister() {
  const [password, setPassword] = useState(false);
  

  return (
    <div className={mentorRegister.container}>
      <h2 className={mentorRegister.heading}>Register as a Mentor</h2>

      <form action="">
        {!password && (
          <div className={mentorRegister.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Seun"
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Akingboye"
              required
            />
            <label htmlFor="track">Track</label>
            <select name="track" id="track" required>
              <option value="Product Design">Product Design</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Cloud">Cloud</option>
            </select>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="seun@studybuddy.com"
              required
            />
            <input
              onClick={() => setPassword(true)}
              type="submit"
              value="Continue"
              className={mentorRegister.continue}
              required
            />
          </div>
        )}

        {password && (
          <div className={mentorRegister.setPasswordContainer}>
            <div className={mentorRegister.setPassword}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="********"
                required
              />
              <input
                type="submit"
                value="Create Account"
                className={mentorRegister.create}
                required
              />
            </div>
          </div>
        )}
        
      </form>
    </div>
  );
}
