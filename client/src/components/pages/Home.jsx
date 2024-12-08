import React, { useLayoutEffect, useState } from "react";
import TodoList from "../TodoList";
import InputCard from "../InputCard";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get(`http://localhost:8080/user/profile`, { withCredentials: true });
        const data = res.data.user;
        setUser(data);
        toast(`welcome agian ${data.name}`);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching tasks:", error);
          navigate("/signup");
        }
      }
    }
    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="text-xl font-bold text-white font-mono">Loading data</div>
    );
  }

  return (
    <div className="w-full h-fit flex justify-start items-center flex-col gap-8 ">
      <Toaster />
      <h3 className="w-fit text-lg text-white font-mono">Welcome {user.name}</h3>
      <h1 className="w-fit text-5xl text-white">Simple Todo App</h1>

      <InputCard />
      <hr className="w-1/2 h-1 bg-red-500" />
      <TodoList />
    </div>
  );
};

export default Home;
