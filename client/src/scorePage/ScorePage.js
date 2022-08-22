import React, { useEffect, useState } from "react";
import ScoreItem from "./ScoreItem";
import ScoreNavbar from "./ScoreNavbar";
import { getActions } from "../app/actions/gameActions";
import { connect } from "react-redux";

const ScorePage = ({ getScores }) => {
  const [scores, setScores] = useState([]);
  const requestScores = async () => {
    let response = await getScores();
    setScores(response);
  };

  useEffect(() => {
    requestScores();
  }, [scores]);

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <ScoreNavbar />
        {/* <div className="m-auto w-max mt-10 text-3xl text-purple-600 bg-white px-4 py-2 rounded-2xl">
          Your Latest Score
        </div>
        <div className="rounded-lg">
          <div className="flex flex-col mt-4 bg-white w-max m-auto rounded-lg">
            <ScoreItem id="Index" username="Username" score="Score" />
          </div> */}
        <div className="m-auto w-max mt-14 text-3xl text-purple-600 bg-white px-4 py-2 rounded-2xl">
          Latest Scores
        </div>
        <div className="flex flex-col mt-8 bg-white w-max m-auto rounded-2xl">
          <ScoreItem id="Index" username="Username" score="Score" />
          {scores ? (
            scores.map((f, index) => (
              <ScoreItem
                key={f._id}
                id={index + 1}
                username={f.user.username}
                score={f.score}
              />
            ))
          ) : (
            <div className="container">No Scores to display!</div>
          )}
        </div>
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(ScorePage);
