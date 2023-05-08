import accountStyles from './account.module.css'
import React, { useState, useRef } from 'react'
import profileimage from '../../../../assets/general/profileimage.png'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import {
  InfoCircle,
  ArrowRight2,
  KeySquare,
  ProfileRemove,
  GalleryEdit,
  Edit,
  CloseCircle
} from 'iconsax-react'

import { useSelector } from 'react-redux'

export default function Account () {
  const [fName, setFName] = useState('Oluwaseun')
  const [lName, setLName] = useState('Akingboye')
  // const [track, setTrack] = useState("Frontend");
  const [lCircle, setLCircle] = useState(25)
  const [img, setimg] = useState(profileimage)

  const nav = useNavigate()

  const edit = useRef(null)
  const handleEdit = () => {
    edit.current.style.display = 'block'
  }

  const handleCancel = () => {
    edit.current.style.display = 'none'
    nav('/dashboard/account')
  }

  let activeStyle = {
    color: '#474AA3',
    fontWeight: '600'
  }

  const {user} = useSelector(state => state?.user.user)

  // console.log(user)

  
  

  return (
    <>
      <main className={accountStyles['main']}>
        <section className={accountStyles['sidePanel']}>
          <article>
            <div className={accountStyles['sidePanel_top']}>
              <div className={accountStyles['sidePanel_image']}>
                <img src={img} alt='' />
              </div>
              <h1 className={accountStyles['sidePanel_profileName']}>
                {user?.account.firstname} {user?.account.lastname}
              </h1>
            </div>
            <div className={accountStyles['links']}>
              <NavLink
                to='/dashboard/account'
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
                className={accountStyles.link}
                onClick={handleEdit}
                to='/dashboard/account/resetpassword'
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
                onClick={handleEdit}
                to='/dashboard/account/deactivateaccount'
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
          <article>
            <div className={accountStyles['mainPanelTop']}>
              <div className={accountStyles['mainPanelTop_profileImage']}>
                <img src={img} alt='' />
                <span>
                  <GalleryEdit
                    size={25}
                    className={accountStyles['profileImage_icon']}
                  />
                </span>
              </div>
              <div className={accountStyles['mainPanelTop_bio']}>
                <h1>
                  Bio{' '}
                  <span>
                    <Edit size={20} />
                  </span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                  quo tempora provident architecto explicabo sint voluptatibus
                  quae eum corrupti unde necessitatibus
                </p>
              </div>
            </div>
            <div className={accountStyles['mainPanelBottom']}>
              <section
                className={accountStyles['mainPanelBottom_profileDetails']}
              >
                <div className={accountStyles['profileDetails_fName']}>
                  <span>First Name</span>
                  <span>{user?.account.firstname}</span>
                </div>
                <div className={accountStyles['profileDetails_lName']}>
                  <span>Last Name</span>
                  <span>{user?.account.lastname}</span>
                </div>
                {user?.owner?.matric && (
                  <div className={accountStyles['profileDetails_sNum']}>
                    <span>Student Number</span>
                    <span>{user?.owner.matric}</span>
                  </div>
                )}
                <div className={accountStyles['profileDetails_rank']}>
                  <span>Rank</span>
                  <span>{user?.accountType}</span>
                </div>
                {user?.learning && (
                  <div className={accountStyles['profileDetails_lCircle']}>
                    <span>Learning Circle</span>
                    <span>{lCircle}</span>
                  </div>
                )}
                <div className={accountStyles['profileDetails_email']}>
                  <span>Email</span>
                  <span>{user?.account.email}</span>
                </div>
              </section>
              <p className={accountStyles['edit']} onClick={handleEdit}>
                Edit details
              </p>
            </div>
          </article>
        </section>
      </main>
      <div ref={edit} className={accountStyles['full_panel']}>
        <span onClick={handleCancel}>
          <CloseCircle size={30} />
        </span>
        <div className={accountStyles['full_panel_right']}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
