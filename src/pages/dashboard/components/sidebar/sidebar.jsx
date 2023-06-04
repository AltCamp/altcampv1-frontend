import { useEffect } from 'react'
import sidebarStyle from './sidebar.module.css'
import darkLogo from '../../../../assets/general/AuthBlackLogo.svg'
import { NavLink, useNavigate } from 'react-router-dom'

// import link icons

import {
  Airdrop,
  Bookmark,
  Bubble,
  ChartCircle,
  Designtools,
  FtxToken,
  Layer,
  Notification,
  People,
  ProfileCircle,
  Profile2User,
  InfoCircle,
  ArrowRight2,
  KeySquare,
  ProfileRemove,
  ColorSwatch,
} from 'iconsax-react'

import { useSelector, useDispatch } from 'react-redux'

import { removeUser } from '../../../../app/slices/generalSlices/userSlice'

import decode from 'jwt-decode'

export default function Sidebar ({ toggleSideBar, handleSideBar }) {
  let activeStyle = {
    color: '#474AA3',
    fontWeight: '600'
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const user = useSelector(state => state?.user.user)

  // console.log(decode(user.token).exp)

  const toggleWidth = window.innerWidth < 950

  // automatically log user out if token as expired
  useEffect(() => {
    if (user) {
      if (decode(user.token).exp < Date.now() / 1000) {
        dispatch(removeUser())
        navigate('/account/login')
      }
    }
  }, [user])

  return (
    <div
      className={`${sidebarStyle.container} ${
        toggleSideBar && sidebarStyle.show
      }`}
    >
      <img src={darkLogo} alt='' className={sidebarStyle.img} />
      <nav className={sidebarStyle.nav}>
        <div className={sidebarStyle.navGroup}>
          <h2>OVERVIEW</h2>
          <div className=''>
            <NavLink
              to='/dashboard'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
              end
            >
              <FtxToken size='23' className={sidebarStyle.icon} />
              Feed
            </NavLink>
            <NavLink
              to='/dashboard/community'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <People size='23' className={sidebarStyle.icon} />
              Community
            </NavLink>
            <NavLink
              to='/dashboard/topics'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <Airdrop size='23' className={sidebarStyle.icon} />
              Topics
            </NavLink>
            <NavLink
              to='/dashboard/bookmarks'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <Bookmark size='23' className={sidebarStyle.icon} />
              Bookmarks
            </NavLink>
          </div>
        </div>
        <div className={sidebarStyle.navGroup}>
          <h2>LEARNING</h2>
          <div className=''>
            <NavLink
              to='/dashboard/circle'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <ChartCircle size='23' className={sidebarStyle.icon} />
              Learning Circle
            </NavLink>
            <NavLink
              to='/dashboard/resources'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <Bubble size='23' className={sidebarStyle.icon} />
              Learning Resources
            </NavLink>
            <NavLink
              to='/dashboard/contributors'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <Layer size='23' className={sidebarStyle.icon} />
              Contributors
            </NavLink>
            <NavLink
              to='/dashboard/quiz'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <Designtools size='23' className={sidebarStyle.icon} />
              Quiz
            </NavLink>
          </div>
        </div>
        <div className={sidebarStyle.navGroup}>
          <h2>PERSONAL</h2>
          <div className=''>
              {/* links for all accounts in mobile media query */}
            <NavLink
              to='/dashboard/account'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <ProfileCircle size='23' className={sidebarStyle.icon} />
              Account
            </NavLink>
            <div className={sidebarStyle.accountLinks}>
              <NavLink
                to="/dashboard/account"
                className={sidebarStyle.link}
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
                to="/dashboard/account/myprojects"
                className={sidebarStyle.link}
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
                className={sidebarStyle.link}
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
                className={sidebarStyle.link}
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
            <NavLink
              to='/dashboard/notifications'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <Notification size='23' className={sidebarStyle.icon} />
              Notifications
            </NavLink>
            <NavLink
              to='/dashboard/users'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleWidth && handleSideBar}
            >
              <Profile2User size='23' className={sidebarStyle.icon} />
              Users
            </NavLink>
            <button
              className={sidebarStyle.logout}
              onClick={() => {
                dispatch(removeUser())
                navigate('/account/login')
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
