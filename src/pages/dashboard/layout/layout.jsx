import { useState, useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../components/topbar';
import LeftSidebar from '../components/sidebars/leftsidebar';
import RightSidebar from '../components/sidebars/rightsidebar';

export default function Layout() {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [currentSection, setCurrentSection] = useState(false);

  const handleSideBar = () => {
    setToggleSideBar(!toggleSideBar);
  };

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname.includes('feed') ||
      location.pathname.includes('community') ||
      location.pathname.includes('bookmarks')
    ) {
      setCurrentSection(true);
    } else {
      setCurrentSection(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/feed');
    }
  }, []);

  return (
    <div className="bg-red flex h-full w-full flex-col items-center ">
      <Topbar toggleSideBar={toggleSideBar} handleSideBar={handleSideBar} />
      <div className="fixed top-0 mx-auto flex h-full w-[80%] min-w-[1200px] max-w-full overflow-y-scroll px-2 pt-[5rem] dashboard:w-full dashboard:min-w-full dashboard:px-0 xl:w-[90%] xl:min-w-[90%] tab:w-full tab:min-w-full ">
        <LeftSidebar
          toggleSideBar={toggleSideBar}
          handleSideBar={handleSideBar}
        />
        <div className=" w-full overflow-y-scroll bg-[#F8F9FA] ">
          <Outlet />
        </div>
        {currentSection && <RightSidebar />}
      </div>
    </div>
  );
}
