import React, { useState } from "react";
import axios from "axios";

const InputCard = () => {
  const [task, setTask] = useState("");

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-1/2 h-fit flex justify-center gap-3 my-7">
      <input
        type="text"
        name="task"
        id="task"
        onChange={(e) => setTask(e.target.value)}
        className="w-2/3 bg-gray-600 px-5 py-3 rounded-md"
        placeholder="Add a Task..."
      />
      <button onClick={(e) => handleCreate(e)}>Add</button>
    </div>
  );
};

export default InputCard;
