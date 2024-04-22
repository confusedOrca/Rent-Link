/*
  Must be nested inside tab to add new tabs
  > title = header of tab
  > anything inside this tag is tab content
*/
import React from "react";

const TabElement = (props) => {
  return <div title={props.title}>{props.children}</div>;
};

export default TabElement;
