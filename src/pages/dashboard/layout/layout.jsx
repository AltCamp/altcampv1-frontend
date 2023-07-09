import { useState } from 'react';

import layoutStyles from './layout.module.css';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/topbar/topbar';
import Sidebar from '../components/sidebar/sidebar';

export default function Layout() {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  const handleSideBar = () => {
    setToggleSideBar(!toggleSideBar);
  };

  return (
    <div className={layoutStyles.container}>
      <Sidebar toggleSideBar={toggleSideBar} handleSideBar={handleSideBar} />
      <div className={layoutStyles.sectionTwo}>
        <Topbar toggleSideBar={toggleSideBar} handleSideBar={handleSideBar} />
        <div className={layoutStyles.outletDiv}>
          <div className={layoutStyles.outlet}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
