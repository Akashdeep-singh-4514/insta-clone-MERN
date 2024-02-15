import React from "react";

function PostsSection({ posts = [] }) {
  return (
    <div className="col-12 row flex m-auto ">
      {posts.map((post) => {
        return (
          <div className="col-lg-3 ">
            <img
              src={post.image}
              alt="post"
              className=" w-100 object-fit-cover "
            />{" "}
          </div>
        );
      })}
    </div>
  );
}

export default PostsSection;
