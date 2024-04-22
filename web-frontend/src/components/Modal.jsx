/*
  Generic modal that overlays over the entire doc
  add classNane to modify the look
  pass onClose function which decides what to be done if modal closes
  open and close modal by using open bool variable
*/
import React from "react";
import Card from "./Card";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

const Modal = ({ open, children, onClose, className }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0  z-5 backdrop-blur-[1px] flex justify-center content-start pt-64">
        <Card
          className={twMerge(
            "animate-appear relative shadow-2xl shadow-slate-500 bg-white min-w-[48rem] min-h-[32rem] h-fit " +
              className
          )}
        >
          <button onClick={onClose} className="absolute top-[1rem] right-[2rem]">
            &#10006;
          </button>
          {children}
        </Card>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
