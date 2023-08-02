import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
} from 'iconsax-react';

import { Button, Tooltip } from 'flowbite-react';

import { useSelector, useDispatch } from 'react-redux';

import { removeUser } from '../../../../app/slices/generalSlices/userSlice';

import decode from 'jwt-decode';

const navlinkObj = [
  {
    header: 'OVERVIEW',
    links: [
      {
        to: '/dashboard/feed',
        icon: <FtxToken size="23" className="text-inherit" />,
        text: 'Feed',
      },
      {
        to: '/dashboard/community',
        icon: <People size="23" className="text-inherit" />,
        text: 'Community',
      },
      {
        to: '/dashboard/topics',
        icon: <Airdrop size="23" className="text-inherit" />,
        text: 'Topics',
      },
      {
        to: '/dashboard/bookmarks',
        icon: <Bookmark size="23" className="text-inherit" />,
        text: 'Bookmarks',
      },
    ],
  },
  {
    header: 'LEARNING',
    links: [
      {
        to: '/dashboard/circle',
        icon: <ChartCircle size="23" className="text-inherit" />,
        text: 'Learning Circle',
      },
      {
        to: '/dashboard/resources',
        icon: <Bubble size="23" className="text-inherit" />,
        text: 'Learning Resources',
      },
      {
        to: '/dashboard/contributors',
        icon: <Layer size="23" className="text-inherit" />,
        text: 'Contributors',
      },
      {
        to: '/dashboard/quiz',
        icon: <Designtools size="23" className="text-inherit" />,
        text: 'Quiz',
      },
    ],
  },
  {
    header: 'PERSONAL',
    links: [
      {
        to: '/dashboard/account',
        icon: <ProfileCircle size="23" className="text-inherit" />,
        text: 'Account',
        childLinks: [
          {
            to: '/dashboard/account',
            icon: <InfoCircle size="20" className="text-inherit" />,
            text: 'My Profile',
          },
          {
            to: '/dashboard/account/myprojects',
            icon: <ColorSwatch size="20" className="text-inherit" />,
            text: 'My Projects',
          },
          {
            to: '/dashboard/account/resetpassword',
            icon: <KeySquare size="20" className="text-inherit" />,
            text: 'Reset Password',
          },
          {
            to: '/dashboard/account/deactivateaccount',
            icon: <ProfileRemove size="20" className="text-inherit" />,
            text: 'Deactivate Account',
          },
        ],
      },
      {
        to: '/dashboard/notifications',
        icon: <Notification size="23" className="text-inherit" />,
        text: 'Notifications',
      },
      {
        to: '/dashboard/users',
        icon: <Profile2User size="23" className="text-inherit" />,
        text: 'Users',
      },
    ],
  },
];

export default function LeftSidebar({ toggleSideBar, handleSideBar }) {
  let activeStyle = {
    color: '#474AA3',
    fontWeight: '600',
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state?.user.user);

  const toggleWidth = window.innerWidth < 950;

  // automatically log user out if token as expired
  useEffect(() => {
    if (user) {
      if (decode(user.token).exp < Date.now() / 1000) {
        dispatch(removeUser());
        navigate('/account/login');
      }
    }
  }, [user]);

  return (
    <div
      className={` h-auto min-w-[16rem] overflow-auto bg-white px-4 py-8
      shadow-[0px_2px_12px_0px_#56565626] xl:min-w-fit 
      tab:fixed tab:left-0 tab:top-0 tab:z-50 tab:h-full tab:-translate-x-full tab:overflow-y-scroll tab:pt-[6rem] tab:transition-all tab:duration-300 ${
        toggleSideBar && 'tab:translate-x-0'
      }
      `}
    >
      <nav className="flex h-fit flex-col gap-6 overflow-y-scroll tab:h-full ">
        {navlinkObj.map((navlink, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            <h2 className="text-[12px] font-semibold text-primary-700">
              {navlink.header}
            </h2>
            {navlink.links.map((link, index) => (
              <div key={index} className="flex flex-col gap-5 pl-5">
                <NavLink
                  to={link.to}
                  className="font-regular flex items-center gap-[0.9rem] text-[15px] text-neutral-600"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  onClick={toggleWidth && handleSideBar}
                >
                  <Tooltip content={link.text} placement="right" style="light">
                    {link.icon}
                  </Tooltip>

                  <span className="text-inherit xl:hidden tab:flex">
                    {link.text}
                  </span>
                </NavLink>
                {link.childLinks &&
                  link.childLinks.length > 0 &&
                  link.childLinks.map((childLink, index) => (
                    <div
                      key={index}
                      className="hidden flex-col gap-[0.8rem] pl-5 xs:flex"
                    >
                      <NavLink
                        to={childLink.to}
                        className="font-regular flex items-center gap-[0.9rem] text-[15px] text-neutral-600"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        onClick={toggleWidth && handleSideBar}
                        {...(childLink.to === '/dashboard/account' && {
                          end: true,
                        })}
                      >
                        {childLink.icon}
                        <span>{childLink.text}</span>
                      </NavLink>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
        <button
          className="cursor-pointer self-start bg-none p-0 text-[15px] font-semibold text-[#d10909] outline-none "
          onClick={() => {
            dispatch(removeUser());
            navigate('/account/login');
          }}
        >
          Log Out
        </button>
        {/* </div> */}
      </nav>
    </div>
  );
}
