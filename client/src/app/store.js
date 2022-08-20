import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";

const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      alert: alertReducer,
    },
  },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
