import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPageNavbar = ({ handleClick, btnTxt }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <>
      <nav className="container flex justify-between px-4 py-3 mx-auto bg-purple-600 top-0">
        <div>
          <h3 className="text-2xl font-medium text-yellow-50 align-middle mt-1">
            BucketDrop
          </h3>
        </div>

        <div>
          <form className="d-flex">
            <button
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center m-1"
              onClick={handleNavigate}
            >
              Home
            </button>
            <button
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center m-1"
              onClick={handleClick}
            >
              {btnTxt}
            </button>
          </form>
        </div>
        {/* <div className="lg:hidden">
        <DropdownMenu />
      </div> */}
      </nav>
    </>
  );
};

export default AuthPageNavbar;
