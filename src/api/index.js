import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-social-media-project.herokuapp.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, postData) =>
  API.patch(`/posts/update/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/delete/${id}`);
export const likePost = (id) => API.patch(`/posts/like/${id}`);

// AUTHENTICATION
export const signIn = (formdata) => API.post("/user/signin", formdata);
export const signUp = (formdata) => API.post("/user/signup", formdata);

// PROFILE
export const editProfile = (data, id) => API.patch(`/user/edit/${id}`, data);
export const getProfile = (id) => API.get(`/user/profile/${id}`);
