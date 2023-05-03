import topbarStyles from './topbar.module.css'


import avatar from '../../../../assets/general/avatar.png'

import { SearchNormal1, Notification } from 'iconsax-react'

import { useSelector } from 'react-redux'

export default function Topbar () {
  const { user } = useSelector(state => state?.user.user)

  // console.log(user)

  // const account = user?.account



  return (
    <div className={topbarStyles.container}>
      <div className={topbarStyles.notify}>
        <Notification size='23' className={topbarStyles.icons} />
      </div>
      <div className={topbarStyles.searchBox}>
        <input
          type='text'
          id='search'
          name='search'
          placeholder='search members, resources, trends, contributors'
        />
        <button type='submit'>
          <SearchNormal1 size='23' className={topbarStyles.icons} />
        </button>
      </div>
      <div className={topbarStyles.profileInfo}>
        <div className={topbarStyles.profileImg}>
          <img src={avatar} alt='' className='' />
        </div>
        <div className={topbarStyles.profileDetails}>
          <p className={topbarStyles.profileName}>
            {user?.firstname}
          </p>
          <p className={topbarStyles.profileBadge}>
            {user?.accountType}
          </p>
        </div>
      </div>
    </div>
  )
}
