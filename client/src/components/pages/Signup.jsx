import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignupUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/user/signup`,
        {
          name,
          username,
          password,
        },
        { withCredentials: true }
      );
      toast(res.data?.message);
      setTimeout(() => {
        console.log("Signed up at:", new Date().toLocaleString());
        navigate("/login");
      }, 5000);
    } catch (error) {
      toast(error.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form className="w-[35rem] h-[30rem] bg-transparent px-6 py-10 text-xl text-white flex justify-between items-center flex-col rounded-md ">
      <Toaster />

      <h1 className="text-4xl font-bold">REGISTER</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        className="w-2/3 border rounded-full py-2 pl-6 text-black"
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="email"
        name="username"
        id="username"
        placeholder="Enter your Username"
        className="w-2/3 border rounded-full py-2 pl-6 text-black"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={!togglePassword ? "password" : "text"}
        name="password"
        id="password"
        placeholder="Enter a Password"
        className="w-2/3 border rounded-full py-2 pl-6 text-black"
      />
      <p className="w-2/3 flex gap-2">
        Already a user?{" "}
        <a href="/login" className="text-white hover:text-blue-700">
          Login
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
        onClick={handleSignup} // Use the renamed function
        type="submit"
        name="name"
        id=""
        className="w-2/3 border bg-green-600 rounded-full py-2 px-3"
      >
        Signup
      </button>
    </form>
  );
};

export default SignupUser;
