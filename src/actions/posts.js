import * as api from "../api";
import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
} from "./constants/actionTypes";
import { startLoading, stopLoading } from "./loading";
import { toast } from "react-toastify";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch(stopLoading());
  } catch (err) {
    toast.error(err.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch(startLoading());
    toast.info("Uploading Post, Please Wait...");
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch(stopLoading());
    toast.success("Post Addded!");
  } catch (err) {
    toast.error(err.message);
  }
};

export const updatePost = (id, postData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.updatePost(id, postData);
    console.log(data);
    dispatch({ type: UPDATE, payload: data });
    dispatch(stopLoading());
    toast.success("Post Updated!");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    toast.success("Post Deleted Succesfully!");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (err) {
    toast.error(err.response.data.message);
  }
};
