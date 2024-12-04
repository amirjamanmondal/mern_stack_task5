import React from "react";

const Card = () => {
  return (
    <div className="w-1/2 h-fit flex justify-start gap-3 items-center text-xl rounded-md border-2 p-2">
      <input type="checkbox" name="select" id="select" className=" w-8 h-8 rounded-md" />
      <p className="w-full h-full px-4 py-2 rounded-md ">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button className="w-fit h-fit px-2 py-1 border rounded-md">Mark</button>
      <button className="w-fit h-fit px-2 py-1 border rounded-md">Delete</button>
    </div>
  );
};

export default Card;
