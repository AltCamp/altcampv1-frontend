// import
import React, { useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import mentor from "./mentor.module.css";
import logo from "../../../../src/assets/general/Authlogo.png";

export default function Mentor() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/mentor/register");
  }, []);
  let activeStyle = {
    width: "180px",
    borderBottom: "4px solid var(--neutral-clr-deep-grey)",
  };
  return (
    <div className={mentor.container}>
      <div className={mentor.background}>
        <div className={mentor.logo}>
          <img src={logo} alt="logo" />
          <p className={mentor.text}>
            Learning made easy and interesting. Share what you know even as you
            learn what you something new
          </p>
        </div>
      </div>
      <div className={mentor.formGroup}>
        <div className={mentor.navbar}>
          <ul className={mentor.nav}>
            <li className={mentor.navItem}>
              <NavLink
                to="/mentor/register"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className={mentor.link}
              >
                Register
              </NavLink>
            </li>
            <li className={mentor.navItem}>
              <NavLink
                to="/mentor/login"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className={mentor.link}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
