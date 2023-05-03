import React from 'react'
import altStudReg from './altStudentRegister.module.css'

export default function AltStudentRegister () {
  return (
    <div className={altStudReg['registerContainer']}>
      <h1 className={altStudReg['registerHeading']}>Register as a student</h1>
      <div className={altStudReg['registerForm']}>
        <form action=''>
          <label htmlFor='FirstName'>First Name</label>
          <input
            type='text'
            name='FirstName'
            id='FirstName'
            placeholder='Seun'
          />
          <label htmlFor='LastName'>Last Name</label>
          <input
            type='text'
            name='LastName'
            id='LastName'
            placeholder='Akingboye'
          />
          <label htmlFor='Track'>Track</label>
          <select name='Track' id='Track'>
            <option value='Frontend'>Frontend</option>
            <option value='Backend'>Backend</option>
            <option value='Product Design'>Product Design</option>
          </select>
          <label htmlFor='studentNumber'>AltSchool Student Number</label>
          <input
            type='text'
            name='studentNumber'
            id='studentNumber'
            placeholder='ALT/2020/0001'
          />
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='seun@gmail.com'
          />
          <input
            type='submit'
            value='Continue'
            className={altStudReg['submit']}
          />
        </form>
      </div>
    </div>
  )
}
