import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import PostsSection from "../Profile/PostsSection";

function Explore() {
  const [token, settoken] = useLocalStorage("instaClone1Token", "");
  const [posts, setposts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/allposts`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setposts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container mt-3">
        {!posts.length > 0 ? (
          <p>no posts</p>
        ) : (
          <PostsSection url="posts" posts={posts} />
        )}
      </div>
    </>
  );
}

export default Explore;
