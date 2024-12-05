import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const InputCard = () => {
  const [task, setTask] = useState("");

  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await axios.get(`http://localhost:8080/user/logout`, {
        withCredentials: true,
      });
      navigate("/login");
      toast("Logout Successfull");
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/user/tasks`,
        {
          task,
        },
        { withCredentials: true }
      );
      setTask("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-1/2 h-fit flex justify-center gap-3">
      <input
        type="text"
        name="task"
        id="task"
        onChange={(e) => setTask(e.target.value)}
        className="w-2/3 bg-gray-600 px-5 py-3 rounded-md"
        placeholder="Add a Task..."
      />
      <button
        onClick={(e) => handleCreate(e)}
        className="w-20 h-12 bg-gray-50 shadow-md rounded-md font-bold hover:bg-blue-400"
      >
        Add
      </button>
      <button
        className=" w-fit font-bold bg-white px-2 py-2 rounded-md text-sm hover:bg-red-800"
        onClick={(e) => {
          e.preventDefault(), handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default InputCard;
