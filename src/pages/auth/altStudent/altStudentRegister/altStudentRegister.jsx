import React from 'react'
import './altStudentRegister.css'

export default function AltStudentRegister() {
  return (
        <div className="RegisterContainer">
            <h1 className="registerheading h1">
              Register as a student
            </h1>
            <div className="registerform">
              <form action="">
                <label for="FirstName">First Name</label>
                <input type="text" name="FirstName" id="FirstName" placeholder='Seun'/>
                <label for="LastName">Last Name</label>
                <input type="text" name="LastName" id="LastName" placeholder='Akingboye'/>
                <label for="Track">Track</label>
                <select name="Track" id="Track">
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Product Design">Product Design</option>
                  </select>
                <label for="studentNumber">AltSchool Student Number</label>
                <input type="text" name="studentNumber" id="studentNumber" placeholder='ALT/2020/0001'/>
                <label for="email">Email Address</label>
                <input type="email" name="email" id="email" placeholder='seun@gmail.com'/>
                <input type="submit" value="Continue" className='submit' />
              </form>
            </div>
        </div>
  )
}
