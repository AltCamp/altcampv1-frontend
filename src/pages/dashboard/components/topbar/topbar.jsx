import { useState } from 'react'

import topbarStyles from './topbar.module.css'

import avatar from '../../../../assets/general/avatar.png'

import {
  SearchNormal1,
  Notification,
  HambergerMenu,
  ToggleOff
} from 'iconsax-react'

import darkLogo from '../../../../assets/general/AuthBlackLogo.svg'

import iconLogo from '../../../../assets/general/logonotext.svg'

import { useSelector } from 'react-redux'

export default function Topbar ({ toggleSideBar, handleSideBar }) {
  const { user } = useSelector(state => state?.user.user)

  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className={topbarStyles.container}>
      <div className={topbarStyles.hamburger} onClick={handleSideBar}>
        <HambergerMenu size='32' className={topbarStyles.icons} />
      </div>
      <div className={topbarStyles.logo}>
        <img src={darkLogo} alt='' className={topbarStyles.img} />
        <img src={iconLogo} alt='' className={topbarStyles.imgSmallScreen} />
      </div>
      <div className={topbarStyles.notifyDesktop}>
        <Notification size='23' className={topbarStyles.icons} />
      </div>
      <div
        className={`${topbarStyles.searchBox} ${
          showSearch && topbarStyles.showSearch
        }`}
      >
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
        <div
          className={topbarStyles.searchMobile}
          onClick={() => {
            handleSearch()
            if (toggleSideBar) {
              handleSideBar()
            }
          }}
        >
          <SearchNormal1 size='23' className={topbarStyles.icons} />
        </div>

        <div className={topbarStyles.notifyMobile}>
          <Notification size='23' className={topbarStyles.icons} />
        </div>
        <div className={topbarStyles.profileImg}>
          <img src={avatar} alt='' className='' />
        </div>
        <div className={topbarStyles.profileDetails}>
          <p className={topbarStyles.profileName}>{user?.firstname}</p>
          <p className={topbarStyles.profileBadge}>{user?.accountType}</p>
        </div>
      </div>
    </div>
  )
}
