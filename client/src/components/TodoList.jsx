import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gear from "../assets/gear.gif";
import toast from "react-hot-toast";
import deleteTask from "../helpers/deleteTask";
import CompleteTask from "../helpers/completeTask";

const TodoList = ({ fetchData }) => {
  const [taskList, setTaskList] = useState(null);
  const [task, setTask] = useState("");

  const mark = true;
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [tasksSelected, setTasksSelected] = useState([]);

  const controller = new AbortController();

  useEffect(() => {
    const controller = new AbortController();
    fetchData({ setTaskList, setLoading, controller });

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    return () => {
      controller.abort(); // Cleanup on unmount
    };
  }, [navigate]);

  // Handle task deletion

  // Toggle task completion (for `mark` logic)

  const handleCheckboxChange = (e, value) => {
    const { checked } = e.target;

    if (checked) {
      // Add value to the array if checked
      setTasksSelected((prev) => [...prev, value]);
    } else {
      // Remove value from the array if unchecked
      console.log("removing : ", value);

      setTasksSelected((prev) => prev.filter((item) => item !== value));
      console.log(tasksSelected);
    }
    console.log(tasksSelected);
  };

  async function handleDeleteSelected() {
    try {
      const res = await axios.delete("http://localhost:8080/user/tasks", {
        data: { selectedId: tasksSelected },
        withCredentials: true,
      });
      const data = res.data?.message;
      toast(data);
      setTaskList((prevTasks) =>
        prevTasks.filter((task) => !tasksSelected.includes(task._id))
      );
    } catch (error) {
      console.log("Error in delete selected ", error);
    }
  }

  if (loading) {
    return (
      <div className="w-1/2 h-fit flex justify-center bg-white shadow-md shadow-slate-800 items-center gap-3 text-xl rounded-md border-2 p-2">
        Task is Loading...
      </div>
    );
  }

  if (!taskList || taskList.length === 0) {
    return (
      <div className="w-full h-fit flex justify-center flex-col   items-center gap-3 text-xl ">
        <div className="w-1/2 h-fit flex justify-center gap-3 font-mono">
          <input
            type="text"
            name="task"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-2/3 bg-gray-600 px-5 py-3 rounded-md text-lg text-white"
            placeholder="Add a Task..."
          />
          <button
            onClick={(e) => handleCreate(e)}
            className="w-fit px-4 py-2 bg-gray-50 shadow-md rounded-md font-bold hover:bg-blue-400 text-lg"
          >
            Add
          </button>
          <button
            className=" w-fit font-bold bg-white p-2 rounded-md hover:bg-red-800 text-lg"
            onClick={(e) => {
              e.preventDefault(), handleLogout();
            }}
          >
            Logout
          </button>
        </div>

        <div className="w-1/2 h-fit flex justify-end items-center gap-6 rounded-md border-2 p-2">
          <button
            className="w-fit h-fit py-2 flex justify-end pr-2 hover:fill-green-500 "
            onClick={(e) => handleDeleteSelected()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              className="w-fit hover:fill-red-500 fill-green-600"
            >
              <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
            </svg>
          </button>
        </div>
        <hr className="w-1/2 h-1" />

        <h1 className="text-white">No tasks found!</h1>
      </div>
    );
  }

  // input field controller and data

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
      const data = res.data.newTask;
      setTaskList([...taskList, data]);
      // setTaskList([...taskList, { task, completed: false }]);
      setTask(" ");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ul className="w-full h-fit relative flex justify-start flex-col   items-center gap-3 text-xl px-2 pb-2">
      <div className="w-1/2 h-fit flex justify-center gap-3 font-mono">
        <input
          type="text"
          name="task"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-2/3 bg-gray-600 px-5 py-3 rounded-md text-lg text-white"
          placeholder="Add a Task..."
        />
        <button
          onClick={(e) => handleCreate(e)}
          className="w-fit px-4 py-2 bg-gray-50 shadow-md rounded-md font-bold hover:bg-blue-400 text-lg"
        >
          Add
        </button>
        <button
          className=" w-fit font-bold bg-white p-2 rounded-md hover:bg-red-800 text-lg"
          onClick={(e) => {
            e.preventDefault(), handleLogout();
          }}
        >
          Logout
        </button>
      </div>

      {/* From here the the task list start  */}
      <div className="w-1/2 h-fit flex justify-end items-center gap-6">
        <button
          className="w-fit h-fit py-2 flex justify-end pr-2 hover:fill-green-500 "
          onClick={(e) => handleDeleteSelected(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            className="w-fit hover:fill-red-500 fill-green-600"
          >
            <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
          </svg>
        </button>
      </div>
      <hr className="w-1/2 h-1" />
      <div
        className="w-1/2 h-fit flex justify-start items-center flex-col overflow-y-scroll nobar gap-2"
        ref={containerRef}
      >
        {taskList.map((item) => (
          <li
            key={item._id}
            className="w-full h-fit bg-white shadow-md shadow-slate-800 text-xl rounded-md border-2 p-2 flex justify-start items-center gap-2"
          >
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(e, item._id)}
              className="w-6 h-6 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <p className="w-full h-full px-4 py-2 rounded-md">{item.task}</p>

            {item.isDone === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="35"
                height="35"
                viewBox="0 0 48 48"
              >
                <linearGradient
                  id="HoiJCu43QtshzIrYCxOfCa_VFaz7MkjAiu0_gr1"
                  x1="21.241"
                  x2="3.541"
                  y1="39.241"
                  y2="21.541"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".108" stopColor="#0d7044"></stop>
                  <stop offset=".433" stopColor="#11945a"></stop>
                </linearGradient>
                <path
                  fill="url(#HoiJCu43QtshzIrYCxOfCa_VFaz7MkjAiu0_gr1)"
                  d="M16.599,41.42L1.58,26.401c-0.774-0.774-0.774-2.028,0-2.802l4.019-4.019	c0.774-0.774,2.028-0.774,2.802,0L23.42,34.599c0.774,0.774,0.774,2.028,0,2.802l-4.019,4.019	C18.627,42.193,17.373,42.193,16.599,41.42z"
                ></path>
                <linearGradient
                  id="HoiJCu43QtshzIrYCxOfCb_VFaz7MkjAiu0_gr2"
                  x1="-15.77"
                  x2="26.403"
                  y1="43.228"
                  y2="43.228"
                  gradientTransform="rotate(134.999 21.287 38.873)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#2ac782"></stop>
                  <stop offset="1" stopColor="#21b876"></stop>
                </linearGradient>
                <path
                  fill="url(#HoiJCu43QtshzIrYCxOfCb_VFaz7MkjAiu0_gr2)"
                  d="M12.58,34.599L39.599,7.58c0.774-0.774,2.028-0.774,2.802,0l4.019,4.019	c0.774,0.774,0.774,2.028,0,2.802L19.401,41.42c-0.774,0.774-2.028,0.774-2.802,0l-4.019-4.019	C11.807,36.627,11.807,35.373,12.58,34.599z"
                ></path>
              </svg>
            ) : (
              <img
                src={gear}
                alt="gear icon"
                height={35}
                width={35}
                onClick={(e) => {
                  {
                    e.preventDefault(),
                      CompleteTask(item, { mark, setTaskList });
                  }
                }}
              />
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              onClick={() => deleteTask(item._id, { setTaskList })}
              className="w-fit hover:fill-red-500"
            >
              <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
            </svg>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default TodoList;

//
