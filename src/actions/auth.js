import { push } from "connected-react-router";
import { LOGOUT } from "./types";
import { CLEAR_MESSAGE } from "./types";

export const login =
  ({ PIN }) =>
  (dispatch) => {
    console.log(PIN);
    if (window.myNavigate) {
      window.myNavigate("/home", { state: "value from login func" });
    } else {
      console.error("Navigate function is not available.");
    }
    //   dispatch({
    //     type: CLEAR_MESSAGE,
    //   });
    //   dispatch(push("/home"));
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
