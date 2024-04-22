/*
  Navbar to navigate the app and to toggle authentication modal
*/
import { useState } from "react";
import Modal from "../components/Modal";
import NavButton from "../components/NavButton";
import AuthTab from "./AuthTab";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LOGOUT_URL = "/logout";

const NavigationBar = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosPrivate(LOGOUT_URL);
      setAuth({});
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-around text-[1.4rem] items-center mb-32">
      <div className="flex justify-evenly space-x-0 xl:space-x-8">
        <NavButton className="mr-16 hidden xl:flex xl:animate-appear hover:border-b-0" to="/">
          logo
        </NavButton>
        <NavButton to="search/dhaka">Search</NavButton>
        <NavButton to="profile" className={!auth.userId && "cursor-not-allowed"}>
          My Profile
        </NavButton>
        <NavButton className={!auth.userId && "cursor-not-allowed"}>Notification</NavButton>
      </div>
      {auth.firstname && <h3>Hello, {auth.firstname}</h3>}
      {!auth.userId && (
        <>
          <NavButton
            className="authModalButton bg-[var(--charcoal)] font-light text-white hover:opacity-90 rounded-md hover:border-b-0"
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </NavButton>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <AuthTab />
          </Modal>
        </>
      )}
      {auth.userId && (
        <>
          <NavButton
            className="authModalButton bg-[var(--charcoal)] font-light text-white hover:opacity-90 rounded-md hover:border-b-0"
            onClick={handleLogout}
          >
            Logout
          </NavButton>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
