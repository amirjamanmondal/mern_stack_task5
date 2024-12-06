import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gear from "../assets/gear.gif";
import toast from "react-hot-toast";

const Card = () => {
  const [tasks, setTasks] = useState(null);
  const [mark, setMark] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [tasksSelected, setTasksSelected] = useState([]);
  // Fetch tasks on mount
  console.log(tasksSelected);

  const controller = new AbortController();

  async function fetchData() {
    try {
      const res = await axios.get(`http://localhost:8080/user/tasks`, {
        withCredentials: true,
        signal: controller.signal, // Attach AbortController signal
      });
      setTasks(res.data.tasks);
      setLoading(false);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    fetchData();

    return () => {
      controller.abort(); // Cleanup on unmount
    };
  }, [navigate]);

  // Handle task deletion
  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:8080/user/tasks/delete/${id}`, {
        withCredentials: true,
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Remove deleted task locally
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Toggle task completion (for `mark` logic)
  async function handleToggleMark(task) {
    try {
      setMark(!mark);
      const updatedTask = { ...task, isDone: !task.isDone }; // Toggle status
      if (mark === true) {
        const res = await axios.patch(
          `http://localhost:8080/user/tasks/mark/${task._id}`,
          {
            isDone: mark,
          },
          { withCredentials: true }
        );
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
        ); // Update local state
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error toggling task mark:", error);
    }
  }

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

  async function handleDeleteSelected(e) {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8080/user/tasks`,
        { selectedId: tasksSelected },
        {
          withCredentials: true,
        }
      );
      const data = res.data?.message;
      toast(data);
      setTasks((prevTasks) =>
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

  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-1/2 h-fit flex justify-center flex-col bg-white shadow-md shadow-slate-800 items-center gap-3 text-xl rounded-md border-2 p-2">
        <div className="w-full h-fit flex justify-end items-center gap-6">
          <button
            className="w-fit h-fit py-2 flex justify-end pr-2 hover:fill-green-500 fill-blue-500 "
            onClick={() => {
              fetchData(), setLoading(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              className={loading ? "animate-spin" : "animate-none"}
            >
              <path d="M 15 3 C 8.9134751 3 3.87999 7.5533546 3.1132812 13.439453 A 1.0001 1.0001 0 1 0 5.0957031 13.697266 C 5.7349943 8.7893639 9.9085249 5 15 5 C 17.766872 5 20.250574 6.1285473 22.058594 7.9414062 L 20 10 L 26 11 L 25 5 L 23.470703 6.5292969 C 21.300701 4.3575454 18.309289 3 15 3 z M 25.912109 15.417969 A 1.0001 1.0001 0 0 0 24.904297 16.302734 C 24.265006 21.210636 20.091475 25 15 25 C 11.977904 25 9.2987537 23.65024 7.4648438 21.535156 L 9 20 L 3 19 L 4 25 L 6.0488281 22.951172 C 8.2452659 25.422716 11.436061 27 15 27 C 21.086525 27 26.12001 22.446646 26.886719 16.560547 A 1.0001 1.0001 0 0 0 25.912109 15.417969 z"></path>
            </svg>
          </button>
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
        <hr className="w-full h-1" />

        <h1>No tasks found!</h1>
      </div>
    );
  }

  return (
    <ul className="w-1/2 h-72 relative flex justify-start flex-col  shadow-md shadow-slate-800 items-center gap-3 text-xl rounded-md border-2 px-2 pb-2">
      <div className="w-full h-fit flex justify-end items-center gap-6">
        <button
          className="w-fit h-fit py-2 flex justify-end pr-2 hover:fill-green-500 fill-blue-500 "
          onClick={() => {
            fetchData(), setLoading(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            className={loading ? "animate-spin" : "animate-none"}
          >
            <path d="M 15 3 C 8.9134751 3 3.87999 7.5533546 3.1132812 13.439453 A 1.0001 1.0001 0 1 0 5.0957031 13.697266 C 5.7349943 8.7893639 9.9085249 5 15 5 C 17.766872 5 20.250574 6.1285473 22.058594 7.9414062 L 20 10 L 26 11 L 25 5 L 23.470703 6.5292969 C 21.300701 4.3575454 18.309289 3 15 3 z M 25.912109 15.417969 A 1.0001 1.0001 0 0 0 24.904297 16.302734 C 24.265006 21.210636 20.091475 25 15 25 C 11.977904 25 9.2987537 23.65024 7.4648438 21.535156 L 9 20 L 3 19 L 4 25 L 6.0488281 22.951172 C 8.2452659 25.422716 11.436061 27 15 27 C 21.086525 27 26.12001 22.446646 26.886719 16.560547 A 1.0001 1.0001 0 0 0 25.912109 15.417969 z"></path>
          </svg>
        </button>
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
      <hr className="w-full h-1" />
      <div
        className="w-full h-fit flex justify-start items-center flex-col overflow-y-scroll nobar gap-2"
        ref={containerRef}
      >
        {tasks.map((item) => (
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
                    e.preventDefault(), handleToggleMark(item);
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
              onClick={() => handleDelete(item._id)}
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

export default Card;
