import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import BackDrop from "../UIElements/BackDrop";
import "./MainNavigation.css";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const MainNavigation = (props) => {
  const [DrawerIsOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
    {DrawerIsOpen && <BackDrop onClick={closeDrawer} />}
      {DrawerIsOpen && (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">
            <AddLocationAltIcon />
            LocaShare
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
