/*
  Used inside tab to hold content
*/
import React from "react";

const TabContent = ({ current, title, children }) => {
  return <div className={current !== title ? "hidden" : ""}>{children}</div>;
};

export default TabContent;
