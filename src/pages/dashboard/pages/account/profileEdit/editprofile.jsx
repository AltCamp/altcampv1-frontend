import React, {useState, useEffect} from 'react'
import profilestyles from './editprofile.module.css'
import { useOutletContext } from 'react-router-dom'
import { useUpdateDetailsMutation } from '../../../../../app/slices/apiSlices/accountSlices/accountMutationSlice';
import { useDispatch } from 'react-redux';
import { setUpdateDetails } from '../../../../../app/slices/generalSlices/userSlice';

export default function Editprofile () {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [track, setTrack] = useState("");
  const [handleEdit, handleCancel] = useOutletContext();
  const dispatch = useDispatch();

  const [updateDetails, { data, isSuccess, isLoading, isError, error}] = useUpdateDetailsMutation();

const handleSubmit = (e) => {
  e.preventDefault();
  updateDetails({
    "firstName": fName,
    "lastName": lName,
    'track': track,
  })
  setFName("");
  setLName("");
  setTrack("");
}
useEffect(() => {
  if (isSuccess){
    dispatch(setUpdateDetails({
      firstName: data?.data.firstName,
      lastName: data?.data.lastName,
      track: data?.data.track
    }))
    handleCancel();
  }
}, [isSuccess])
  return (
    <div className={profilestyles['container']}>
      <div className={profilestyles['header']}>
        <p>Edit Profile Details</p>
      </div>
      <div className={profilestyles['form']}>
        <form action='' onSubmit={(e)=> handleSubmit(e)}>
          <label htmlFor='fName'>First Name</label>
          <input type='text' name='fName' id='fName' placeholder='seun' value={fName} onChange={(e)=> setFName(e.target.value)} required/>
          <label htmlFor='lName'>Last Name</label>
          <input type='text' name='lName' id='lName' placeholder='akingboye' value={lName} onChange={(e) => setLName(e.target.value)} required/>
          <label htmlFor='track'>Track</label>
          <select name='track' id='track' value={track} onChange={(e)=> setTrack(e.target.value)} className={profilestyles['select']} required>
            <option value='Frontend Engineering'>Frontend</option>
            <option value='Backend Engineering'>Backend</option>
            <option value='Product Design'>Product Design</option>
          </select>
          <label htmlFor='lCircle'>Learning Circle</label>
          <input type='text' name='lCircle' id='lCircle' />
          <input  type='submit' value='Save Changes' disabled={isLoading}/>
        </form>
      </div>
    </div>
  )
}
