import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

const SignInForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, pwd }), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const { firstname, lastname, userId, accessToken } = response?.data;
      setAuth({ email, firstname, lastname, userId, accessToken });
      setEmail("");
      setPwd("");
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
  };

  return (
    <>
      <div className="flex justify-center text-red-900 mb-4">
        {error !== "" && <h3>{error}</h3>}
      </div>

      <form
        className="flex flex-col justify-around text-2xl font-mono w-[80%] mx-auto"
        onSubmit={handleSubmit}
      >
        <label htmlFor="signInEmail">Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          id="signInEmail"
          className="border-[1px] p-2 my-2 rounded-lg"
        />
        <label htmlFor="signInPassword" className="mt-4">
          Password
        </label>
        <input
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          type="password"
          id="signInPassword"
          className="border-[1px] p-2 my-2 rounded-lg"
        />
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

export default SignInForm;
