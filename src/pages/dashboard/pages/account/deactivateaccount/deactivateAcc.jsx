import React, {useEffect} from 'react'
import deactivateAcc from './deactivateAcc.module.css'
import { useOutletContext } from 'react-router-dom'

export default function DeactivateAcc() {
  const [handleEdit] = useOutletContext()
  useEffect(() => {
    return handleEdit()
  },[])
  return (
    <div className={deactivateAcc['container']}>
        <div className={deactivateAcc['header']}>
            <p>Account Deactivation</p>
        </div>
        <div className={deactivateAcc['body']}>
            <p>
            Deactivating your account means your details will be removed from this platform. This might not be reverseable.
            </p>
            <input type='submit' value='Deactivate Account'/>
        </div>
    </div>
  )
}