import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import geolocation from "geolocation";
import { useNavigate } from "react-router-dom";

const REGISTER_URL = "/register";
const LOGIN_URL = "/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cPWd, setCPwd] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [error, setError] = useState("");

  const handleGetLocation = () => {
    geolocation.getCurrentPosition((error, position) => {
      if (error) {
        console.log("Error getting location:", error.message);
      } else {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
      }
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(email)) {
      setError("Invalid Email");
    }
    if (pwd.length < 8) {
      setError("Password should atleast be 8 characters long");
    } else if (pwd !== cPWd) {
      setError("Passwords do not match");
    }

    if (lat === 0 || lon === 0) setError("Location needed to avail our services!");

    if (error !== "") return;

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ firstname, lastname, email, pwd, gender, age, lat, lon }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        try {
          const response = await axios.post(LOGIN_URL, JSON.stringify({ email, pwd }), {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          console.log(response);
          const { firstname, lastname, userId, accessToken } = response?.data;
          setAuth({ email, firstname, lastname, userId, accessToken });
          navigate("/");
        } catch (error) {
          console.log(error);
          if (!error?.response) {
            setError("No Server Response");
          } else if (error.response?.status === 400) {
            setError("Missing Email or Password");
          } else if (error.response?.status === 401) {
            setError("Incorrect Email or Password");
          } else {
            setError("Login failed");
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setError("No Server Response");
      } else if (error.response?.status === 409) {
        setError("Email already in use");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        {error !== "" && <h3 className="text-red-900">{error}</h3>}
      </div>
      <form
        className="flex flex-col justify-around text-2xl font-mono w-[80%] mx-auto"
        onSubmit={handleSignup}
      >
        <div className="flex">
          <div>
            <label htmlFor="signUpFirstname">First name</label>
            <input
              type="text"
              id="signUpFirstname"
              className="border-[1px] p-2 my-2 rounded-lg"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="signUpLastname">Last name</label>
            <input
              type="text"
              id="signUpLastname"
              className="border-[1px] p-2 my-2 rounded-lg"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
        </div>

        <label htmlFor="signUpEmail">Email</label>
        <input
          type="text"
          id="signUpEmail"
          className="border-[1px] p-2 my-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="signUpPassword" className="mt-4">
          Password
        </label>
        <input
          type="password"
          id="signUpPassword"
          className="border-[1px] p-2 my-2 rounded-lg"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <label htmlFor="signUpConfirmPassword" className="mt-4">
          Confirm Password
        </label>
        <input
          type="password"
          id="signUpConfirmPassword"
          className="border-[1px] p-2 my-2 rounded-lg"
          value={cPWd}
          onChange={(e) => setCPwd(e.target.value)}
          required
        />

        <div className="mt-4 flex justify-between items-center">
          <div>
            <label htmlFor="age" className="mr-4">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="border-[1px] p-2 my-2 rounded-lg w-[4rem]"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="mr-4 ml-4">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="border-[1px] p-2 my-2 rounded-lg w-[8rem]"
              onChange={(e) => {
                setGender(e.target.value);
              }}
              value={gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGetLocation}
            className="border-[1px] text-xl ml-8 p-2 px-4 my-2 rounded-lg w-[16rem]"
          >
            Provide Location
          </button>
        </div>

        <button
          type="submit"
          className="my-8 text-white text-xl rounded-lg p-4 bg-slate-600 w-[10rem]"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
