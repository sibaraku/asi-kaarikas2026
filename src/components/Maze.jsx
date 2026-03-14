import { useState } from "react";

function Maze() {
  const [count, setCount] = useState(0);

  const randomNumber = Math.floor(Math.random() * (10 - 20)) + 10;

  return (
    <div className="grid grid-cols-3 gap-4 bg-black w-100vw h-100vh">
      <div className="..."></div>
      <div className="..."></div>
      <div className="..."></div>
      <div className="col-span-2 ..."></div>
      <div className="...">05</div>
      <div className="...">06</div>
      <div className="col-span-2 ..."></div>
    </div>
  );
}

export default Maze;
