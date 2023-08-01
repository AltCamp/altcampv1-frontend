import React, { useState, useEffect, useContext } from 'react';
import profilestyles from './editprofile.module.css';
import { useOutletContext } from 'react-router-dom';
import { useUpdateDetailsMutation } from '../../../../../app/slices/apiSlices/accountSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUpdateDetails } from '../../../../../app/slices/generalSlices/userSlice';
import { ToasterContext } from '../../../../../components/Toaster';

export default function Editprofile() {
  const { user } = useSelector((state) => state?.user.user);

  const [handleEdit, handleCancel] = useOutletContext();
  const { setToast } = useContext(ToasterContext);
  const dispatch = useDispatch();

  const [updateDetails, { data, isSuccess, isLoading, isError, error }] =
    useUpdateDetailsMutation();

  //state manangement

  const [state, setState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    track: user.track,
  });

  const handleStateUpdate = (newState) => {
    setState({
      ...state,
      ...newState,
    });
  };

  const handleCloseToast = () =>
    setToast({
      show: false,
      title: null,
      message: null,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDetails({
      firstName: state.firstName,
      lastName: state.lastName,
      track: state.track,
    });
    handleStateUpdate({
      firstName: '',
      lastName: '',
      track: '',
    });
  };
  useEffect(() => {
    if (isSuccess) {
      setToast({
        show: true,
        message: data?.message,
        type: 'success',
      });
      dispatch(
        setUpdateDetails({
          firstName: data?.data.firstName,
          lastName: data?.data.lastName,
          track: data?.data.track,
        })
      );
      setTimeout(() => {
        handleCloseToast();
        handleCancel();
      }, 3000);
    } else if (isError) {
      setToast({
        show: true,
        title: 'Upload Error!',
        message: error?.data?.message,
        type: 'error',
      });
      setTimeout(() => {
        handleCloseToast();
      }, 3000);
    }
  }, [isSuccess, isError]);
  return (
    <div className={profilestyles['container']}>
      <div className={profilestyles['header']}>
        <p>Edit Profile Details</p>
      </div>
      <div className={profilestyles['form']}>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={state.firstName}
            onChange={(e) => handleStateUpdate({ firstName: e.target.value })}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={state.lastName}
            onChange={(e) => handleStateUpdate({ lastName: e.target.value })}
          />
          <label htmlFor="track">Track</label>
          <select
            name="track"
            id="track"
            value={state.track}
            onChange={(e) => handleStateUpdate({ track: e.target.value })}
            className={profilestyles['select']}
          >
            <option value="Frontend Engineering">Frontend Engineering</option>
            <option value="Backend Engineering">Backend Engineering</option>
            <option value="Cloud Engineering">Cloud Engineering</option>
            <option value="Product Design">Product Design</option>
            <option value="Product Management">Product Management</option>
            <option value="Product Marketing">Product Marketing</option>
            <option value="Data Science">Data Science</option>
            <option value="Data Engineering">Data Engineering</option>
            <option value="Data Analysis">Data Analysis</option>
          </select>
          <label htmlFor="lCircle">Learning Circle</label>
          <input type="text" name="lCircle" id="lCircle" />
          <input
            type="submit"
            value={isLoading ? 'saving changes...' : 'Save Changes'}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
