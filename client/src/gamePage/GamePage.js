import React, { useEffect, useState } from "react";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../app/actions/authActions";
import NavbarGamePage from "./AppBarGamePage";
import Game from "./Game";

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

  return (
    <div>
      <NavbarGamePage
        gameState={gameState}
        setGameState={setGameState}
        time={time}
        setTime={setTime}
        score={score}
        setScore={setScore}
      />
      <Game
        gameState={gameState}
        setGameState={setGameState}
        score={score}
        setScore={setScore}
      />
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(GamePage);
