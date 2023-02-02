import React from 'react'
import './altStudentLogin.css'

export default function AltStudentLogin() {
  return (
    <>
    <div className='loginContainer'>
      <div className="loginheading h1">
        Welcome Back
      </div>
      <div className="loginform">
        <form action="">
          <label for="email">Email Address</label>
          <input type="email" name="email" id="email" placeholder='seun@gmail.com'/>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" placeholder='********'/>
          <input type="submit" value="Log in" className='loginsubmit' />
        </form>
      </div>
      <span className="forgot">
          Forgot Password?
        </span>
    </div>
    </>
  )
}
