import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import PostsSection from "../Profile/PostsSection";

function Explore() {
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const [posts, setposts] = useState([]);
  let limit = 10;
  const getPosts = () => {
    fetch(`http://localhost:5000/allposts?limits${limit}`, {
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
  };
  useEffect(() => {
    getPosts();
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);
  const handlescroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      limit = limit + 10;

      getPosts();
    }
  };

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
