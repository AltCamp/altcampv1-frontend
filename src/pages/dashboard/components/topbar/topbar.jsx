import topbarStyles from './topbar.module.css'


import avatar from '../../../../assets/general/avatar.png'

import { SearchNormal1, Notification } from 'iconsax-react'

export default function Topbar () {
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
          <p className={topbarStyles.profileName}>Oluwaseun</p>
          <p className={topbarStyles.profileBadge}>STUDENT</p>
        </div>
      </div>
    </div>
  )
}
