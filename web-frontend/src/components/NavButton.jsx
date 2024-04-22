/*
  Generic navbar button; className gets passed to the inner anchor element
  > adds a bottom border on hover
  > styles can be added or modified using className
*/
import { twMerge } from "tailwind-merge";
import { NavLink } from "react-router-dom";

const NavButton = (props) => {
  return (
    <NavLink
      to={props.to}
      className={twMerge(
        "px-8 h-16 flex items-center cursor-pointer hover:border-b-slate-900 hover:border-b-[2px] " +
          props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  );
};

export default NavButton;
