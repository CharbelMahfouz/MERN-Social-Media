import React, { useEffect, useState } from "react";
import "./EditForm.css";
import { Avatar } from "@material-ui/core";
import { storage } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editprofile } from "../../actions/account";

const EditProfileForm = ({ setOpenPopup }) => {
  const handleCloseForm = () => {
    setOpenPopup(false);
  };

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user._id;
  const [updatedProfileData, setupdatedProfileData] = useState({
    name: "",
    bio: "",
    email: user.email,
    profileImg: "",
  });

  useEffect(() => {
    setupdatedProfileData({
      name: user.name,
      bio: user.bio,
      profileImg: user.profileImg,
    });
  }, [user.name, user.bio, user.profileImg]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(editprofile(updatedProfileData, userId));
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
            setupdatedProfileData({ ...updatedProfileData, profileImg: url });
          });
        toast.success("Image upload complete");
      }
    );
  };

  return (
    <div className="edit-form-container">
      <form className="edit-form" onSubmit={handleProfileUpdate}>
        <h4>Edit Profile</h4>
        <div className="edit-profile-pic-container">
          <label htmlFor="edit-form-input">
            <Avatar
              alt={user.name}
              src={user.profileImg}
              className="edit-profile-pic-placeholder"
            />
          </label>

          <input
            type="file"
            name="profileImg"
            id="edit-form-input"
            onChange={uploadImage}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="fullName"
            value={updatedProfileData.name}
            onChange={(e) => {
              setupdatedProfileData({
                ...updatedProfileData,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Bio">Bio:</label>
          <textarea
            name="Bio"
            id=""
            cols="20"
            rows="3"
            className="bio-input"
            value={updatedProfileData.bio}
            onChange={(e) => {
              setupdatedProfileData({
                ...updatedProfileData,
                bio: e.target.value,
              });
            }}
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
