import Post from "../Post/Post";
import { useSelector } from "react-redux";

const PostList = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <div>
      {posts.length ? (
        posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      ) : (
        <p style={{ textAlign: "center", fontSize: "30px", color: "white" }}>
          No Posts Yet
        </p>
      )}
    </div>
  );
};

export default PostList;
