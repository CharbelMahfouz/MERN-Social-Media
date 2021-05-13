import React from "react";

import MakePost from "./MakePost/MakePost";
import PostList from "./PostList/PostList";
import "./Feed.css";

const Feed = () => {
  return (
    <div className="feed">
      <MakePost />
      <PostList />
    </div>
  );
};

export default Feed;
