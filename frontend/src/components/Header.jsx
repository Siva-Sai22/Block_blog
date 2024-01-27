import logo from "../assets/logo.png"
import { useState } from "react";

function Header() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <div className="mx-4 flex items-center justify-between">
        <div className="flex items-center">
          <img className="h-14" src={logo}/>
          <p className=" text-xl font-bold">Block Blog</p>
        </div>
        <div className="flex gap-4">
          <div
            onClick={handleClick}
            href=""
            className={`cursor-pointer ${!isClicked ? "text-blue-500" : "text-black"}`}
          >
            Explore
          </div>
          <div
            onClick={handleClick}
            href=""
            className={`cursor-pointer ${isClicked ? "text-blue-500" : "text-black"}`}
          >
            Inbox
          </div>
        </div>
        <button className="mr-4 rounded-lg bg-blue-500 px-4 py-1  text-white">
          Create
        </button>
      </div>
      <hr />
    </>
  );
}

export default Header;
