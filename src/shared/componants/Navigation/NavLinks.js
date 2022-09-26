import React, { useContext } from "react";

import Button from "../FormElements/Button";
import { LoginContext } from "../../context/LoginContext";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(LoginContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exat="true">
          POSTS
        </NavLink>
      </li>

      {auth.isLoggedin && (
        <li>
          <NavLink to={`${auth.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {auth.isLoggedin && (
        <li>
          <NavLink to="/places/new"> Add Place</NavLink>
        </li>
      )}
      {!auth.isLoggedin && (
        <li>
          <NavLink to="/login"> LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedin && (
        <li>
          <Button onClick={auth.Logout}>LOGOUT</Button>
        </li>
      )}
      {auth.isLoggedin && (
        <li>
          <p>Welcome, {auth.name}</p>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
