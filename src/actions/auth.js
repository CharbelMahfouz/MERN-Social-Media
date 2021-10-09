import * as api from "../api/index";
import { AUTH } from "./constants/actionTypes";
import { toast } from "react-toastify";
import { startLoading, stopLoading } from "./loading";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.signIn(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    history.push("/");
    toast.success("Logged In Successfully");
    dispatch(stopLoading());
  } catch (err) {
    console.log(err);
    dispatch(stopLoading());

    toast.error(err.response.data.message);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
    dispatch(stopLoading());
    toast.success("Sign Up Successful");
  } catch (err) {
    console.log(err);
    dispatch(stopLoading());

    toast.error(err.response.data.message);
  }
};
