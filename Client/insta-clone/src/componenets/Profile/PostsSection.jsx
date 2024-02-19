import React from "react";
import { Link } from "react-router-dom";
function PostsSection({ posts = [] }) {
  // const Navigate = useNavigate();
  // console.log(posts);
  return (
    <div className="col-12 row flex m-auto ">
      {posts.map((post) => {
        return (
          <div key={post._id} className="col-lg-3  ">
            <Link to={`/post/${post._id}`}>
              <img
                src={post.image}
                alt="post"
                className=" w-100 object-fit-cover "
              />{" "}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default PostsSection;
