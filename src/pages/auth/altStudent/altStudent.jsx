import React, { useEffect } from "react";
import { Outlet, useNavigate, Link, NavLink } from "react-router-dom";
import "./altStudent.css";
import AltStudentLogin from "./altStudentLogin/altStudentLogin";
import AltStudentRegister from "./altStudentRegister/altStudentRegister";
import background from "../../../../src/assets/general/AuthBackground.webp";
import logo from "../../../../src/assets/general/Authlogo.png";

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
    <div className="AltstudentContainer">
      <div className="Altstudentleft">
        <div className="Altstudentimage">
          <img src={background} alt="background" />
        </div>
        <div className="Altstudentlogo">
          <img src={logo} alt="logo" />
          <p className="Altstudentparagraph p_regular">
            Learning made easy and interesting.Share what you know and learn
            what you don't.
          </p>
        </div>
      </div>
      <div className="Altstudentright">
        <div className="Altstudentnav">
          <ul className="navigation">
            <li className="navigation-item">
              <NavLink
                to="/altstudent/register"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className="link"
              >
                Register
              </NavLink>
            </li>

            <li className="navigation-item">
              <NavLink
                to="/altstudent/login"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className="link"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <Link to='/altstudent/login'>Login</Link>
        <Link to='/altstudent/register'>Register</Link> */}
        <Outlet />
      </div>
    </div>
  );
}
