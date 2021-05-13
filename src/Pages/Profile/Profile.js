import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Home Components/Navbar/Navbar";
import "./Profile.css";
import * as api from "../../api/index";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../actions/loading";
import Popup from "../../components/Popup/Popup";
import Post from "../../components/Home Components/Feed/Post/Post";
import EditProfileForm from "../../components/EditForm/EditProfileForm";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const currUser = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts);
  const [user, setUser] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userId, setUserId] = useState(props.match.params.id);
  const [openPopup, setOpenPopup] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.authData);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  useEffect(() => {
    const fetchProfile = async (userId) => {
      dispatch(startLoading());
      const { data } = await api.getProfile(userId);
      setUserPosts(data.userPosts);
      setUser(data.user);
      dispatch(stopLoading());
    };

    fetchProfile(userId);
  }, [userId, dispatch, posts, loggedInUser]);

  return (
    <>
      <Navbar />

      <section className="user__profile-section">
        <div className="container">
          <div className="user__profile-section-container">
            <div className="profile__container">
              <div className="profile__user-info-container">
                <div className="profile__img-container">
                  <div className="avatar-container">
                    <Avatar
                      alt={user.name}
                      className="avatar"
                      src={user.profileImg}
                    />
                  </div>
                </div>
                <div className="profile__user-info">
                  <div className="profile__user-info-top">
                    <p className="profile__user-info-name">{user.name}</p>
                    {currUser._id === userId && (
                      <button
                        className="edit-profile-btn"
                        onClick={(e) => {
                          handleClose();
                          handleOpenPopup();
                        }}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  <div className="profile__user-info-center">
                    <p className="user-post-count">
                      <span>{userPosts.length}</span> posts
                    </p>
                  </div>
                  <hr />
                  <div className="profile__user-info-bottom">
                    <p className="user__bio">{user.bio}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="user__posts-container">
              {userPosts.length ? (
                userPosts.map((post) => {
                  return <Post key={post._id} post={post} />;
                })
              ) : (
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  User Has No Posts
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <EditProfileForm setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
};

export default Profile;
