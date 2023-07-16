import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import authHeroImage from '../../assets/general/AuthBackground.webp';
import altcampWhiteLogo from '../../assets/general/AuthWhiteLogo.svg';
import mobileLogo from './../../assets/general/AuthBlackLogo.svg';

export default function AuthLayout() {
  let activeStyle = {
    color: '#6a6ff5',
    fontWeight: '700',
    borderBottom: '4px solid #6a6ff5',
  };

  return (
    <div className="absolute left-0 top-0 flex h-full w-full justify-between overflow-hidden lg:h-auto lg:overflow-y-scroll">
      <div className="relative h-full w-1/2 bg-cover lg:hidden">
        <div className="absolute flex h-full w-full items-center justify-center bg-secondary-800 text-[18px] opacity-70">
          <div className="flex w-1/2 flex-col items-center  text-center text-white xl:w-[60%]">
            <img
              src={altcampWhiteLogo}
              alt="altcamp Logo"
              className="mb-[20px] w-[80%]"
            />
            <p className="leading-8">
              Learning made easy and interesting. Share what you know even as
              you learn what you do not know
            </p>
          </div>
        </div>
        <img
          src={authHeroImage}
          alt="hero image of a student"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center lg:mb-4 lg:w-full">
        <div className="hidden lg:flex lg:p-8">
          <img src={mobileLogo} alt="altcamp mobile logo" className="" />
        </div>

        <div className="flex h-[95%] w-[75%] flex-col overflow-y-scroll xl:w-[85%] sm:w-[90%]">
          <nav className="flex h-[3rem] min-h-[3rem] w-full font-medium text-neutral-800 [&>*]:flex [&>*]:h-full [&>*]:w-1/2 [&>*]:items-center [&>*]:justify-center [&>*]:border-b-[4px] [&>*]:border-neutral-300 [&>*]:text-neutral-800 ">
            <NavLink
              to="/account"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="a1"
              end
            >
              REGISTER
            </NavLink>
            <NavLink
              to="/account/login"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="a2"
            >
              LOGIN
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
