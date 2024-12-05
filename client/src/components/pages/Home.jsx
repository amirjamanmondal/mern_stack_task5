import React from "react";
import Card from "../Card";
import InputCard from "../InputCard";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <div className="w-full h-fit flex justify-start items-center flex-col gap-8 ">
      <Toaster />

      <h1 className="w-fit text-5xl text-white">Simple Todo App</h1>

      <InputCard />
      <hr className="w-1/2 h-1 bg-red-500" />
      <Card />
    </div>
  );
};

export default Home;
