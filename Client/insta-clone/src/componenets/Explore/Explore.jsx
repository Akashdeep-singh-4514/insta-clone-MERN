import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import PostsSection from "../Profile/PostsSection";

function Explore() {
  const [token, setToken] = useLocalStorage("instaCloneToken", "");
  const [posts, setPosts] = useState([]);
  let limit = 10;

  const getPosts = async () => {
    try {
      const res = await fetch(
        `https://insta-clone-mern-bakend.onrender.com/allposts?limits${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      limit += 10;
      getPosts();
    }
  };

  return (
    <div className="container mt-3">
      {!posts.length > 0 ? (
        <p>loading</p>
      ) : (
        <PostsSection url="posts" posts={posts} />
      )}
    </div>
  );
}

export default Explore;
