import React from "react";

import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = props => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exat = "true"> Home</NavLink>
      </li>
      <li>
        <NavLink to="/userId/places"> My Places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new"> Add Place</NavLink>
      </li>
      <li>
        <NavLink to="/auth"> Authenticate</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
