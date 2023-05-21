import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import userProfileStyle from './userProfile.module.css'
import userStyles from '../users.module.css'
import profileimage from '../../../../../assets/general/profileimage.png'
import { ArrowCircleLeft } from 'iconsax-react'

import { useGetStudentByIdQuery } from '../../../../../app/slices/apiSlices/accountSlices/allStudentSlices'


export default function UserProfile () {
  const { userId } = useParams()
  const [user, setUser] = useState([])
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentByIdQuery(userId)

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      setUser(data?.data)
    }
  }, [isSuccess])

  return (
    <main className={userProfileStyle.profileContainer}>
      <div className={userProfileStyle.back} onClick={() => navigate(-1)}>
        <ArrowCircleLeft size='23' className={userProfileStyle.backIcon} />
        <div className={userProfileStyle.backText}>Back to community</div>
      </div>
      {isLoading && (
        <div className={userStyles.loading}>
          <div className={userStyles.loader}></div>
        </div>
      )}
      {isSuccess && (
        <section className={userProfileStyle.profileTop}>
          <div className={userProfileStyle.profileTopLeft}>
            <img src={profileimage} alt='' />
          </div>
          <div className={userProfileStyle.profileTopRight}>
            <aside className={userProfileStyle.profileTopRightTop}>
              <p className={userProfileStyle.profileTopName}>
                <b>{user?.firstName}</b> <b>{user?.lastName}</b>
              </p>
              <p className={userProfileStyle.profileTopTrack}>
                Track <span>{user.track}</span>
              </p>
              <p className={userProfileStyle.profileTopRank}>
                Rank <span>{user.accountType}</span>
              </p>
              <p className={userProfileStyle.profileTopEmail}>
                Email Address <span>{user.email}</span>
              </p>
            </aside>
            <aside className={userProfileStyle.profileTopRightBottom}>
              <h3 className={userProfileStyle.profileBio}>Bio</h3>
              <p className={userProfileStyle.profileBioText}>
                {/* {user.bio} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                quo tempora provident architecto explicabo sint voluptatibus
                quae eum corrupti unde necessitatibus
              </p>
            </aside>
          </div>
        </section>
      )}
    </main>
  )
}
