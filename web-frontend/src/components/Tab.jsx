/*
  Tabs to allow user to quicky load other content
  For each tab, insert TabElement content
  Pass tab name as title props
  Pass tab content as children
*/
import React, { useState } from "react";
import NavButton from "./NavButton";
import TabContent from "./TabContent";
import { twMerge } from "tailwind-merge";
const Tab = ({ children, className }) => {
  const [current, setCurrent] = useState(children[0].props.title);

  return (
    <div className={className}>
      <div className="header flex mb-10">
        {children.map((child) => (
          <NavButton
            onClick={() => {
              setCurrent(child.props.title);
            }}
            key={child.props.title}
            className={twMerge(
              "hover:border-b-grey " +
                (current === child.props.title && "border-b-2 border-b-black")
            )}
          >
            {child.props.title}
          </NavButton>
        ))}
      </div>
      <div className="body">
        {children.map((child) => (
          <TabContent
            className="content "
            key={child.props.title}
            title={child.props.title}
            current={current}
          >
            {child.props.children}
          </TabContent>
        ))}
      </div>
    </div>
  );
};

export default Tab;
