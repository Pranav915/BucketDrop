import React, { useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import PauseIcon from "@mui/icons-material/PauseCircle";
import PlayIcon from "@mui/icons-material/PlayCircle";
import { logout } from "../shared/utils/auth";
import { getActions } from "../app/actions/gameActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { imgArray } from "./componentsImages";

const AppBarGamePage = ({
  gameState,
  setGameState,
  time,
  setTime,
  score,
  setScore,
  postScore,
  setX,
  setY,
  setIdx,
}) => {
  let intervalRef = useRef();
  const navigate = useNavigate();

  // const handleKeyDown = (e) => {
  //   if (e.keyCode === 32 || e.keyCode === 13) {
  //     handleChangeGameState();
  //   }
  // };

  useEffect(() => {
    if (time === 0) {
      postScore({ score }, navigate);
    }
  });

  const decreaseNum = () => {
    setTime((t) => {
      if (t <= 0) {
        setGameState(false);
        setTime(0);
        clearInterval(intervalRef.current);
      } else {
        return t - 1;
      }
    });
  };

  const handleRestart = () => {
    setScore(0);
    setTime(60);
    setGameState(false);
    clearInterval(intervalRef.current);
    setIdx(Math.floor(Math.random() * imgArray.length));
    setX(Math.floor(Math.random() * 1000));
    setY(90);
  };

  const navigateHome = () => {
    navigate("/home");
  };

  const handleChangeGameState = () => {
    setGameState(!gameState);
    if (gameState) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
  };

  return (
    <>
      <nav className="container flex justify-between px-4 py-3 mx-auto bg-purple-600">
        <div>
          <h3 className="text-2xl font-medium text-yellow-50 align-middle">
            BucketDrop
          </h3>
        </div>

        <div className="hidden space-x-8 lg:flex">
          <div className="text-l font-semibold text-white">
            <button
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center m-1"
              onClick={navigateHome}
            >
              <i class="fas fa-home mr-1"></i>
              Home
            </button>
          </div>
          <div>
            <div className="text-xl font-semibold text-white">Time</div>
            <div className="text-xl font-semibold w-max m-auto bg-white py-1 px-2 mt-1 rounded-full">
              <p>{time}</p>
            </div>
          </div>
          <div>
            <IconButton
              onClick={handleChangeGameState}
              // onKeyDown={handleKeyDown}
            >
              {gameState ? (
                <PauseIcon style={{ color: "white" }} fontSize="large" />
              ) : (
                <PlayIcon style={{ color: "white" }} fontSize="large" />
              )}
            </IconButton>
          </div>
          <div className="content-center">
            <div className="text-xl font-semibold text-white">Score</div>
            <div className="text-xl font-semibold w-max m-auto bg-white py-1 px-2 mt-1 rounded-full">
              <p>{score}</p>
            </div>
          </div>
          <div className="text-l font-semibold text-white">
            <button
              className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center m-1"
              onClick={handleRestart}
            >
              <i class="fas fa-undo mr-1"></i>
              Play Again
            </button>
          </div>
        </div>

        <div>
          <button
            className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center"
            onClick={logout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
            Logout
          </button>
        </div>
        {/* <div className="lg:hidden">
          <DropdownMenu />
        </div> */}
      </nav>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(AppBarGamePage);
