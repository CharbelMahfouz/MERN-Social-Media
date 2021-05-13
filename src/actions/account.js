import * as api from "../api/index";
import { EDIT_PROFILE } from "./constants/actionTypes";
import { toast } from "react-toastify";

export const editprofile = (userData, id) => async (dispatch) => {
  try {
    toast.info("Updating Profile Info...");
    const { data } = await api.editProfile(userData, id);
    dispatch({ type: EDIT_PROFILE, data });
    toast.success("Profile Updated Succesfully");
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
  }
};
