import React from "react";

const UserPost = ({ post }) => {
  return (
    <div className="user__post">
      <img src={post.selectedFile} alt="" className="user__post-img" />
    </div>
  );
};

export default UserPost;
