import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    message,
  });

export default rootReducer;
