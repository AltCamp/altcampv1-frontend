import React, {useState, useEffect} from 'react'
import profilestyles from './editprofile.module.css'
import { useOutletContext } from 'react-router-dom'
import { useUpdateDetailsMutation } from '../../../../../app/slices/apiSlices/accountSlices/accountMutationSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUpdateDetails } from '../../../../../app/slices/generalSlices/userSlice';

export default function Editprofile () {
  const {user} = useSelector(state => state?.user.user);

  const [fName, setFName] = useState(user.firstName);
  const [lName, setLName] = useState(user.lastName);
  const [track, setTrack] = useState(user.track);
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
          <input type='text' name='fName' id='fName' value={fName} onChange={(e)=> setFName(e.target.value)}/>
          <label htmlFor='lName'>Last Name</label>
          <input type='text' name='lName' id='lName' value={lName} onChange={(e) => setLName(e.target.value)}/>
          <label htmlFor='track'>Track</label>
          <select name='track' id='track' value={track} onChange={(e)=> setTrack(e.target.value)} className={profilestyles['select']} >
            <option value='Frontend Engineering'>Frontend Engineering</option>
            <option value='Backend Engineering'>Backend Engineering</option>
            <option value='Cloud Engineering'>Cloud Engineering</option>
            <option value='Product Design'>Product Design</option>
            <option value='Product Management'>Product Management</option>
            <option value='Product Marketing'>Product Marketing</option>
            <option value='Data Science'>Data Science</option>
            <option value='Data Engineering'>Data Engineering</option>
            <option value='Data Analysis'>Data Analysis</option>  
          </select>
          <label htmlFor='lCircle'>Learning Circle</label>
          <input type='text' name='lCircle' id='lCircle' />
          <input  type='submit' value={isLoading? "saving changes...":'Save Changes'} disabled={isLoading}/>
        </form>
      </div>
    </div>
  )
}
