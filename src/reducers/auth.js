import { AUTH, LOGOUT, EDIT_PROFILE } from "../actions/constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
    case EDIT_PROFILE:
      localStorage.setItem("token", JSON.stringify(action?.data.token));
      localStorage.setItem("profile", JSON.stringify(action?.data.result));
      return { ...state, authData: action?.data.result };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
