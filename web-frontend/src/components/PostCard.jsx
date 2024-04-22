/*
  A Basic card to show user rent post
  supply the following props
*/
import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { twMerge } from "tailwind-merge";

const PostCard = ({ address, rent, size, id, imageUrl, cid, className }) => {
  const { auth } = useAuth();
  return (
    <Card
      className={twMerge(
        "shrink-0 border-slate-600 border-[1px] p-0 font-mono text-xl font-semibold h-[40rem] overflow-hidden w-[32rem] " +
          className
      )}
    >
      <img src={imageUrl} alt="" className="imageholder h-[18rem] mx-auto" />

      <div className="buttonBox flex justify-between space-x-[1px]">
        <Link
          to={"/viewpost/" + id}
          className="font-sans font-light hover:opacity-90 bg-slate-600 text-white py-4 px-8 p-8 h-[4rem] w-full text-center"
        >
          View More
        </Link>
        {(cid === auth.userId && auth.userId) && (
          <Link
            to={"edit/" + id}
            className="font-sans font-light hover:opacity-90 bg-slate-600 text-white py-4 px-8 p-8 h-[4rem] w-full text-center"
          >
            Edit
          </Link>
        )}
      </div>
      <div className="details h-[18rem] w-[32rem] flex flex-col p-8 justify-center space-y-6">
        <div className="overflow-y-clip h-fit">{address}</div>
        <h3>Monthly Rent: TK {rent}</h3>
        <h3>Property Size: {size} sq.ft.</h3>
      </div>
    </Card>
  );
};

export default PostCard;
