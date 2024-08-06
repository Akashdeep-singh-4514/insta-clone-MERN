import React, { useEffect, useState } from "react";
import Article from "./Article";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useUser();
  const Navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const [posts, setPosts] = useState([]);
  const [authStatus, setAuthStatus] = useState(false);
  let limit = 10;

  useEffect(() => {
    if (user && user.loggedIn) {
      setAuthStatus(user.loggedIn);
    } else {
      Navigate("/signin");
      settoken("");
      setAuthStatus(false);
    }
  }, [user, token]);

  const getPosts = async () => {
    setloading(true);
    try {
      const response = await fetch(
        `https://insta-clone-mern-bakend.onrender.com/followedposts?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setPosts([...result]);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (authStatus) {
      getPosts();
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [authStatus]);

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
    <>
      <div className="row">
        {loading && <p>loading</p>}
        {!loading && authStatus && <p>no posts for you, go to explore</p>}

        {!loading && !authStatus && <p>you're not logged in</p>}
        {authStatus &&
          posts.map((post) => (
            <Article
              key={post._id}
              postId={post._id}
              username={post.userId.userName}
              userId={post.userId._id}
              postUrl={post.image}
              caption={post.content}
              likes={post.likes}
              pfp={post.userId.pfp}
            />
          ))}
      </div>
    </>
  );
}
