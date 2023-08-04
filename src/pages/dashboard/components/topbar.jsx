import { useState, useEffect } from 'react';

import { ProfileCircle } from 'iconsax-react';

import { Link } from 'react-router-dom';

import {
  SearchNormal1,
  Notification,
  HambergerMenu,
  ToggleOff,
} from 'iconsax-react';

import darkLogo from '../../../assets/general/AuthBlackLogo.svg';

import iconLogo from '../../../assets/general/logonotext.svg';

import { useSelector } from 'react-redux';

export default function Topbar({ toggleSideBar, handleSideBar }) {
  const { user } = useSelector((state) => state?.user.user);

  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div
      className=" z-30 flex h-fit w-full items-center justify-center bg-white py-[10px] font-inter
    shadow-[0px_2px_12px_0px_#56565626] tab:px-2
"
    >
      <div className="flex h-full w-[80%] min-w-[1200px] max-w-full items-center justify-between overflow-y-scroll px-2 dashboard:w-full dashboard:min-w-full dashboard:px-4">
        <div className="hidden cursor-pointer tab:flex" onClick={handleSideBar}>
          <HambergerMenu size="32" className="cursor-pointer text-inherit" />
        </div>
        <Link to="/dashboard/feed" className="tab:hidden">
          <img src={darkLogo} alt="" className="h-[3.5rem]" />
        </Link>
        <Link to="/dashboard/feed" className="hidden tab:flex ">
          <img src={darkLogo} alt="" className="xs:hidden" />
          <img src={iconLogo} alt="" className="tab:hidden xs:flex" />
        </Link>
        <div
          className={`border-1 flex h-[2.5rem] w-1/2 items-center justify-between overflow-hidden rounded-[5px] border-neutral-200 bg-white shadow-[0px_2px_2px_rgba(86,_86,_86,_0.15)] tab:hidden
        `}
        >
          <input
            type="text"
            id="search"
            name="search"
            placeholder="search members, resources, trends, contributors"
            className="h-full w-full border-none bg-transparent px-[10px] text-[12px] outline-none placeholder:font-inter placeholder:text-neutral-500"
          />
          <button
            type="submit"
            className="flex h-full w-[3rem] cursor-pointer items-center justify-center border-none bg-neutral-900 text-white outline-none "
          >
            <SearchNormal1 size="23" className="text-inherit" />
          </button>
        </div>
        {showSearch && (
          <div
            className={`border-1 absolute left-1/2 top-[5.5rem] hidden h-[2.5rem] w-[90%] -translate-x-1/2 transform animate-showSearch items-center justify-between overflow-hidden rounded-[5px] border-neutral-200 bg-white shadow-[0px_2px_2px_rgba(86,_86,_86,_0.15)] tab:flex
        `}
          >
            <input
              type="text"
              id="search"
              name="search"
              placeholder="search members, resources, trends, contributors"
              className="h-full w-full border-none bg-transparent px-[10px] text-[12px] outline-none placeholder:font-inter placeholder:text-neutral-500"
            />
            <button
              type="submit"
              className="flex h-full w-[3rem] cursor-pointer items-center justify-center border-none bg-neutral-900 text-white outline-none "
            >
              <SearchNormal1 size="23" className="text-inherit" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-[0.8rem]">
          <div
            className="hidden tab:flex tab:cursor-pointer"
            onClick={() => {
              handleSearch();
              if (toggleSideBar) {
                handleSideBar();
              }
            }}
          >
            <SearchNormal1 size="23" className="text-inherit" />
          </div>

          <div className="flex">
            <Notification size="23" className="text-inherit" />
          </div>
          <Link
            to={`/dashboard/account`}
            className="max-h[2.5rem] h-[2.5rem] w-[2.5rem] max-w-[2.5rem] overflow-hidden rounded-full border-2 border-neutral-500 "
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <ProfileCircle
                size={45}
                color="#555555"
                className="h-full w-full object-cover"
              />
            )}
          </Link>
          <div className="flex flex-col gap-[0.2rem] ">
            <p className="text-[14px] font-medium text-neutral-950 ">
              {user?.firstName}
            </p>
            <p className="w-fit rounded-[5px] bg-secondary-600 px-[0.5rem] py-[0.2rem] text-[10px] font-bold uppercase text-white ">
              {user?.accountType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
