import React, { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import PostAddIcon from "@material-ui/icons/PostAdd";
import "./MakePost.css";
import { useDispatch } from "react-redux";
import { createPost } from "../../../../actions/posts";
import { storage } from "../../../../firebase/firebase";
import { toast } from "react-toastify";

const MakePost = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    message: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPost({ ...postData, name: user.name, userImg: user.profileImg })
    );
    setPostData({
      message: "",
      selectedFile: "",
      userImg: "",
    });
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    toast.info("Uploading Image Please Wait...");
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        toast.error(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setPostData({ ...postData, selectedFile: url });
          });
        toast.success("Image upload complete");
      }
    );
  };

  return (
    <>
      <div className="make-post__container">
        <form onSubmit={handleSubmit}>
          <div className="make-post__input">
            <textarea
              name="message"
              cols="30"
              rows="0"
              placeholder="What's On Your Mind?"
              value={postData.message}
              onChange={handleChange}
            ></textarea>
            <div className="input-btns">
              <input
                type="file"
                name=""
                id="fileInput"
                multiple={false}
                onChange={uploadImage}
              />
              <label htmlFor="fileInput" className="upload-img">
                <ImageIcon /> Upload Image
              </label>
              <button
                className="post-btn"
                disabled={
                  postData.message === "" && postData.selectedFile === ""
                }
              >
                <PostAddIcon /> Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MakePost;
