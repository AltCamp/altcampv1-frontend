import accountStyles from './account.module.css';
import React, { useState, useRef } from 'react';
// import profileimage from "../../../../assets/general/profileimage.png";
import { NavLink, useNavigate, useLocation, Outlet } from 'react-router-dom';
import Myprofile from './myprofile/myprofile';
import { ProfileCircle } from 'iconsax-react';

import {
  InfoCircle,
  ArrowRight2,
  KeySquare,
  ProfileRemove,
  CloseCircle,
  ColorSwatch,
  AlignHorizontally,
} from 'iconsax-react';

import { useSelector } from 'react-redux';
import Myprojects from './myprojects/myprojects';
import MyActivities from './myActivities/myActivities';

export default function Account() {
  // const [track, setTrack] = useState("Frontend");
  const [lCircle, setLCircle] = useState(25);

  const nav = useNavigate();
  const location = useLocation();
  // console.log(location)

  const edit = useRef(null);

  const handleEdit = () => {
    edit.current.style.display = 'block';
  };

  const handleEditProfile = () => {
    handleEdit();
    nav('/dashboard/account/editprofile');
  };
  const updateProfilePicture = () => {
    handleEdit();
    nav('/dashboard/account/updateprofilepicture');
  };

  const updateBio = () => {
    handleEdit();
    nav('/dashboard/account/updatebio');
  };

  const handleCancel = () => {
    edit.current.style.display = 'none';
    nav('/dashboard/account');
  };

  let activeStyle = {
    color: '#474AA3',
    fontWeight: '600',
  };

  const { user } = useSelector((state) => state?.user);

  // console.log(user)

  return (
    <>
      <main className={accountStyles['main']}>
        <section className={accountStyles['sidePanel']}>
          <article>
            <div className="mb-4 flex w-full flex-col justify-center">
              <div className="mx-auto mb-2 h-[3.5rem] w-[3.5rem]">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="display image"
                    className="h-[inherit] w-[inherit] rounded-full border-4 border-neutral-500"
                  />
                ) : (
                  <ProfileCircle size={50} />
                )}
              </div>
              <h1 className="text-center text-sm font-medium text-neutral-600">
                {user?.firstName} {user?.lastName}
              </h1>
            </div>
            <div className={accountStyles['links']}>
              <NavLink
                to="/dashboard/account"
                className={accountStyles.link}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                end
              >
                <span>
                  <InfoCircle size={20} />
                </span>
                <span> My Profile </span>
                <span>
                  <ArrowRight2 size={20} />
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/account/myactivities"
                className={accountStyles.link}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <span>
                  <AlignHorizontally size={20} />
                </span>
                <span> My Activities</span>
                <span>
                  <ArrowRight2 size={20} />
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/account/myprojects"
                className={accountStyles.link}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <span>
                  <ColorSwatch size={20} />
                </span>
                <span> My Project </span>
                <span>
                  <ArrowRight2 size={20} />
                </span>
              </NavLink>
              <NavLink
                className={accountStyles.link}
                to="/dashboard/account/resetpassword"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <span>
                  <KeySquare size={20} />
                </span>
                <span> Reset Password </span>
                <span>
                  <ArrowRight2 size={20} />
                </span>
              </NavLink>
              <NavLink
                className={accountStyles.link}
                to="/dashboard/account/deactivateaccount"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <span>
                  <ProfileRemove size={20} />
                </span>
                <span> Deactivate Account </span>
                <span>
                  <ArrowRight2 size={20} />
                </span>
              </NavLink>
            </div>
          </article>
        </section>
        <section className={accountStyles['mainPanel']}>
          {location.pathname === '/dashboard/account/myprojects' ? (
            <Myprojects />
          ) : location.pathname === '/dashboard/account/myactivities' ? (
            <MyActivities />
          ) : (
            <Myprofile
              edit={handleEditProfile}
              picUpdate={updateProfilePicture}
              updateBio={updateBio}
            />
          )}
        </section>
      </main>
      <div ref={edit} className={accountStyles['full_panel']}>
        <span onClick={handleCancel}>
          <CloseCircle size={30} />
        </span>
        <div className={accountStyles['full_panel_right']}>
          <Outlet context={[handleEdit, handleCancel]} />
        </div>
      </div>
    </>
  );
}
