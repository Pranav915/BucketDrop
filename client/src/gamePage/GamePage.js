import React, { useEffect, useState } from "react";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../app/actions/authActions";
import NavbarGamePage from "./AppBarGamePage";
import Game from "./Game";
import { imgArray } from "./componentsImages";

const GamePage = ({ setUserDetails }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
    }
  });

  const [gameState, setGameState] = useState(false);
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [idx, setIdx] = useState(Math.floor(Math.random() * imgArray.length));
  const [x, setX] = useState(Math.floor(Math.random() * 1000));
  const [y, setY] = useState(90);
  const [fallState, setFallState] = useState(true);

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <NavbarGamePage
          gameState={gameState}
          setGameState={setGameState}
          time={time}
          setTime={setTime}
          score={score}
          setScore={setScore}
          setIdx={setIdx}
          setX={setX}
          setY={setY}
          fallState={fallState}
          setFallState={setFallState}
        />
        <Game
          gameState={gameState}
          setGameState={setGameState}
          score={score}
          setScore={setScore}
          idx={idx}
          x={x}
          y={y}
          setIdx={setIdx}
          setX={setX}
          setY={setY}
          fallState={fallState}
          setFallState={setFallState}
        />
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(GamePage);
