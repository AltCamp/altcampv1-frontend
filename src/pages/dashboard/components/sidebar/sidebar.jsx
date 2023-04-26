import sidebarStyle from './sidebar.module.css'
import darkLogo from '../../../../assets/general/AuthBlackLogo.png'
import { NavLink } from 'react-router-dom'

// import link icons

import { FtxToken, People } from 'iconsax-react'

export default function Sidebar () {
  let activeStyle = {
    color: '#474AA3',
    fontWeight: '600'
  }

  return (
    <div className={sidebarStyle.container}>
      <img src={darkLogo} alt='' className={sidebarStyle.img} />
      <nav className={sidebarStyle.nav}>
        <div className={sidebarStyle.navGroup}>
          <h2>OVERVIEW</h2>
          <div className=''>
            <NavLink
              to='/dashboard'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              end
            >
              <FtxToken size='23' className={sidebarStyle.icon} />
              Feed
            </NavLink>
            <NavLink
              to='/dashboard/community'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <People size='23' className={sidebarStyle.icon} />
              Community
            </NavLink>
            <NavLink
              to='/dashboard/topics'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <People size='23' className={sidebarStyle.icon} />
              Topics
            </NavLink>
            <NavLink
              to='/dashboard/bookmarks'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <People size='23' className={sidebarStyle.icon} />
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
            >
              <People size='23' className={sidebarStyle.icon} />
              Learning Circle
            </NavLink>
            <NavLink
              to='/dashboard/resources'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <People size='23' className={sidebarStyle.icon} />
              Learning Resources
            </NavLink>
            <NavLink
              to='/dashboard/contributors'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <People size='23' className={sidebarStyle.icon} />
              Contributors
            </NavLink>
            <NavLink
              to='/dashboard/quiz'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <People size='23' className={sidebarStyle.icon} />
              Quiz
            </NavLink>
          </div>
        </div>
        <div className={sidebarStyle.navGroup}>
          <h2>PERSONAL</h2>
          <div className=''>
            <NavLink
              to='/dashboard/profile'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <People size='23' className={sidebarStyle.icon} />
              Account
            </NavLink>
            <NavLink
              to='/dashboard/notifications'
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <People size='23' className={sidebarStyle.icon} />
              Notifications
            </NavLink>
            <NavLink
              to='/'
              className={sidebarStyle.logout}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Log Out
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  )
}
