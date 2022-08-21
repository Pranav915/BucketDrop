import { gameActions } from "../actions/gameActions";

const initState = {
  scores: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case gameActions.SET_SCORES:
      return {
        ...state,
        scores: action.scores,
      };
    default:
      return state;
  }
};

export default reducer;
