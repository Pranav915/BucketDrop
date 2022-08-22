import * as api from "../../api";
import { openAlertMessage } from "./alertActions";

export const gameActions = {
  SET_SCORES: "AUTH.SET_SCORES",
};

export const setScores = (scores) => {
  return {
    type: gameActions.SET_SCORES,
    scores,
  };
};

export const getActions = (dispatch) => {
  return {
    postScore: (data, navigate) => dispatch(postScore(data, navigate)),
    getScores: () => dispatch(getScores()),
  };
};

export const postScore = (data, navigate) => {
  return async (dispatch) => {
    const response = await api.postScore(data);
    if (response.error) {
      console.log("response", response);
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { data } = response?.data;
      console.log("data", data);
      // localStorage.setItem("user", JSON.stringify(userDetails));
      // dispatch(setUserDetails(userDetails));
      navigate("/home");
    }
  };
};

export const getScores = () => {
  return async (dispatch) => {
    const response = await api.getScores();
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const scores = response?.data;
      setScores(scores);
      return scores;
    }
  };
};
