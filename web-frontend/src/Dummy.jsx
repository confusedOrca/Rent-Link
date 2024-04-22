import React, { useEffect } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

const Dummy = () => {
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosPrivate.get("/getchats");
      console.log(result.data);
    };
    fetchData();
  });
  return <div></div>;
};

export default Dummy;
