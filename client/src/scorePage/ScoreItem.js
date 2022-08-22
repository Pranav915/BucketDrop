import React from "react";

const ScoreItem = ({ id, username, score }) => {
  return (
    <>
      <div id="score-item" className="flex border-b-2 border-black ">
        <div className="py-2 px-20 w-56">{id}</div>
        <div className="py-2 px-20 w-56">{username}</div>
        <div className="py-2 px-20 w-56">{score}</div>
      </div>
    </>
  );
};

export default ScoreItem;
