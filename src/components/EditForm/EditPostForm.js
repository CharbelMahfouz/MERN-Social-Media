import React, { useEffect, useState } from "react";
import "./EditForm.css";
import { storage } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatePost } from "../../actions/posts";

const EditProfileForm = ({ setOpenPopup, post }) => {
  const handleCloseForm = () => {
    setOpenPopup(false);
  };

  const dispatch = useDispatch();
  const [updatedPostData, setUpdatedPostData] = useState({
    updatedMessage: "",
    selectedFile: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    setUpdatedPostData({
      updatedMessage: post.message,
      selectedFile: post.selectedFile,
    });
  }, [post.message, post.selectedFile]);

  const handleChange = (e) => {
    setUpdatedPostData({ ...updatedPostData, [e.target.name]: e.target.value });
  };

  const handlePostUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePost(post._id, { ...updatedPostData, name: user.name }));
    setOpenPopup(false);
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
            setUpdatedPostData({ ...updatedPostData, selectedFile: url });
          });
        toast.success("Image upload complete");
      }
    );
  };

  return (
    <div className="edit-form-container">
      <form className="edit-form" onSubmit={handlePostUpdate}>
        <h4>Edit Post</h4>
        <div className="edit-post-img-container">
          <label htmlFor="edit-form-input">
            <div
              className="post-img-preview"
              style={{
                backgroundImage:
                  updatedPostData.selectedFile === ""
                    ? "url(./images/placeholder.jpg)"
                    : `url(${updatedPostData.selectedFile})`,
                backgroundSize: "cover",
                backgroundPosition: "Center",
                objectFit: "contain",
                height: "100px",
                width: "80px",
              }}
            ></div>
          </label>

          <input
            type="file"
            name="selectedFile"
            id="edit-form-input"
            onChange={uploadImage}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            name="updatedMessage"
            id=""
            cols="20"
            rows="3"
            className="bio-input"
            value={updatedPostData.updatedMessage}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="edit-form-btns">
          <button type="submit" className="edit-form-submit-btn">
            Save
          </button>
          <button
            type="button"
            className="edit-form-cancel-btn"
            onClick={handleCloseForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
