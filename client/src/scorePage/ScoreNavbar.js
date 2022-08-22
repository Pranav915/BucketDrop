import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../shared/utils/auth";

const ScoreNavbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handlePlay = () => {
    navigate("/game");
  };

  return (
    <nav className="flex justify-between px-4 py-3 mx-auto bg-purple-600 top-0">
      <div>
        <h3 className="text-2xl font-medium text-yellow-50 align-middle mt-1">
          BucketDrop
        </h3>
      </div>
      <div className="hidden space-x-8 lg:flex">
        <div>
          <div className="text-l font-semibold text-white">
            <button
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center m-1"
              onClick={handlePlay}
            >
              <i class="fa-solid fa-play mr-2"></i>
              Play
            </button>
          </div>
        </div>
      </div>

      <div>
        {!localStorage.getItem("user") ? (
          <form className="d-flex">
            <button
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center m-1"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center m-1"
              onClick={handleRegister}
            >
              Signup
            </button>
          </form>
        ) : (
          <button
            onClick={logout}
            className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center m-1"
          >
            <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
            Logout
          </button>
        )}
      </div>
      {/* <div className="lg:hidden">
        <DropdownMenu />
      </div> */}
    </nav>
  );
};

export default ScoreNavbar;
