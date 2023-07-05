import React, {useEffect} from 'react'
import resetStyles from './resetpass.module.css'
import { useOutletContext } from 'react-router-dom'

export default function Resetpass() {
  const [handleEdit] = useOutletContext()
  useEffect(() => {
    return handleEdit()
  },[])
  return (
    <div className={resetStyles['container']}>
        <div className={resetStyles['header']}>
            <p>Reset Password</p>
        </div>
        <div className={resetStyles['body']}>
            <div>
              <h3>Email address is needed</h3>
              <p>Kindly input the email address you registered your account with.</p>
            </div>
            <div>
              <form action="">
                <label htmlFor="emailAddress">Email Address</label>
                <input type="email" name='emailAddress' placeholder='Enter email address' />
                <input type='submit' value='Continue'/>
              </form>
            </div>
        </div>
    </div>
  )
}