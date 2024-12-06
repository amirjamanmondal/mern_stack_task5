import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      toast("Login Successful");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      localStorage.setItem("sid", res.data?.token);
    } catch (error) {
      console.error(error);
      toast("login failed");
    }
    setUsername("");
    setPassword("");
  };
  return (
    <form className="w-[35rem] h-[30rem] bg-transparent text-white px-6 py-10 text-xl flex justify-between items-center flex-col rounded-md mt-4">
      <Toaster />
      <h1 className="text-4xl font-bold">LOGIN</h1>
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
        type="email"
        name="username"
        id="username"
        placeholder="Enter your Username"
        className="w-2/3 border rounded-full py-2 pl-6 text-black"
      />

      <input
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type={togglePassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Enter a Password"
        className="w-2/3 border rounded-full py-2 pl-6 text-black"
      />
      <p className="w-full p-1 text-center">
        Don't have an account?
        <a href="/signup" className="text-white hover:text-blue-700 ml-1">
          Signup
        </a>
      </p>
      <div className="w-2/3 flex gap-2 text-sm ">
        <input
          type="checkbox"
          name=""
          id="showPassKey"
          onClick={() => setTogglePassword(!togglePassword)}
        />
        <label htmlFor="showPassKey">Show Password</label>
      </div>
      <button
        onClick={(e) => {
          LoginHandler(e);
        }}
        type="submit"
        name="btn"
        id=""
        className="w-2/3 border bg-green-600 rounded-full py-2 px-3"
      >
        Login
      </button>
    </form>
  );
};

export default LoginUser;
