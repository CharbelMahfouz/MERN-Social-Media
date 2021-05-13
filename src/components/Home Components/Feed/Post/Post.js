import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "./Post.css";
import moment from "moment";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import EditPostForm from "../../../EditForm/EditPostForm";
import Popup from "../../../Popup/Popup";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../../actions/posts";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Post = ({ post }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
  };

  const handleLikePost = () => {
    dispatch(likePost(post._id));
  };

  const Likes = () => {
    if (post.likes === undefined) {
      return "0";
    }
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user._id) ? (
        <>
          <p>
            {post.likes.length > 2
              ? `you and ${post.likes.length - 1} others`
              : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""} `}
          </p>
        </>
      ) : (
        <>
          <p>
            {post.likes.length === 1
              ? ` ${post.likes.length} Like`
              : ` ${post.likes.length} Likes`}
          </p>
        </>
      );
    } else {
      return "0 likes";
    }
  };

  return (
    <>
      <div className="post">
        <div className="post__top">
          <div className="post__top-info">
            <div className="post__user">
              <Avatar alt={post.name} className="avatar" src={post.userImg} />
              <div className="post__user-info">
                <Link to={`/user/${post.creator}`} className="post__user-name">
                  {post.name}
                </Link>
                <p className="post__timeStamp">
                  {moment(post.createdAt).fromNow()}
                </p>
              </div>
            </div>
            {user._id === post.creator && (
              <div className="post__settings">
                <IconButton aria-label="settings" onClick={handleMenu}>
                  <MoreVertIcon className="settings-icon" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleOpenPopup();
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleDeletePost();
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
          <div className="post__top-text">
            <p className="post__text">{post.message}</p>
          </div>
        </div>
        <div className="post__center">
          {post.selectedFile && (
            <div className="post__img-container">
              <img src={post.selectedFile} alt="" />
            </div>
          )}

          <div className="post__stats-container">
            <div className="post__likes">
              <FavoriteBorderIcon />
              <Likes />
            </div>
          </div>
        </div>
        <div className="post__bottom">
          <div className="post__actions">
            <button
              onClick={handleLikePost}
              className={
                post.likes && post.likes.find((like) => like === user._id)
                  ? "post__like-btn liked"
                  : "post__like-btn"
              }
            >
              <FavoriteBorderIcon />
              <p>
                {post.likes && post.likes.find((like) => like === user._id)
                  ? "liked"
                  : "like"}
              </p>
            </button>
          </div>
        </div>
      </div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} post={post}>
        <EditPostForm post={post} setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
};

export default Post;
