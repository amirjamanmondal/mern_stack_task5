import React, { useLayoutEffect } from "react";
import Card from "../Card";
import InputCard from "../InputCard";
import axios from "axios";
const Home = () => {
  const [tasks, setTasks] = useState(null);

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:8080/user/tasks`, {
          withCredentials: true,
        });
        setTasks(res.data.tasks);
        console.log(res.data.tasks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="w-full h-fit flex justify-start items-center flex-col gap-8">
      <h1 className="text-5xl">Simple Todo App</h1>
      <InputCard />
      <hr className="w-1/2 h-1 bg-red-500" />
      <Card />
    </div>
  );
};

export default Home;
