import React from "react";
import ReactDOM from "react-dom";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  return ReactDOM.createPortal(
    <aside className="side-drawer">{props.children}</aside>,
    document.getElementById("drawer-hook")
  );
};

export default SideDrawer;
