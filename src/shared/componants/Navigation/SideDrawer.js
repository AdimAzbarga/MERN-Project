import React from "react";
import ReactDOM from "react-dom";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  const Content = <aside className="side-drawer">{props.children}</aside>;

  return ReactDOM.createPortal(Content, document.getElementById("drawer-root"));
};

export default SideDrawer;
