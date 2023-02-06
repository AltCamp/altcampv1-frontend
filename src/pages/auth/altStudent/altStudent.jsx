import React, { useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import altStudStyle from "./altStudent.css";
import authHeroImage from "../../../assets/general/AuthBackground.webp";
import studyBuddyLogo from "../../../assets/general/Authlogo.png";

export default function AltStudent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/altstudent/register");
  }, []);

  let activeStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div className={altStudStyle.AltstudentContainer}>
      <div className={altStudStyle.Altstudentleft}>
        <div className={altStudStyle.Altstudentimage}>
          <img src={authHeroImage} alt="background" />
        </div>
        <div className={altStudStyle.Altstudentlogo}>
          <img src={studyBuddyLogo} alt="logo" />
          <p className={altStudStyle.Altstudentparagraph}>
            Learning made easy and interesting.Share what you know and learn
            what you don't.
          </p>
        </div>
      </div>
      <div className={altStudStyle.Altstudentright}>
        <div className={altStudStyle.Altstudentnav}>
          <ul className={altStudStyle.navigation}>
            <li className={altStudStyle.navigation - item}>
              <NavLink
                to="/altstudent/register"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className={altStudStyle.link}
              >
                Register
              </NavLink>
            </li>

            <li className={altStudStyle.navigation - item}>
              <NavLink
                to="/altstudent/login"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className={altStudStyle.link}
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
