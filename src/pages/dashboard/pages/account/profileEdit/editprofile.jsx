import React from 'react'
import profilestyles from './editprofile.module.css'

export default function Editprofile() {
  return (
    <div className={profilestyles['container']}>
        <div className={profilestyles['header']}>
            <p>Edit Profile Details</p>
        </div>
        <div className={profilestyles['form']}>
            <form action="">
                <label htmlFor="fName">
                    First Name
                </label>
                <input type="text" name="fName" id="fName" placeholder='seun'/>
                <label htmlFor="lName">
                    Last Name
                </label>
                <input type="text" name="lName" id="lName" placeholder='akingboye'/>
                <label htmlFor="track">
                    Track
                </label>
                <select name="track" id="track">
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="product design">Product Design</option>
                </select>
                <label htmlFor="lCircle">
                    Learning Circle
                </label>
                <input type="text" name="lCircle" id="lCircle" />
                <input type='submit' value='Save Changes'/>
            </form>
        </div>
    </div>
  )
}
