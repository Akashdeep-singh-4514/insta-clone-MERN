import React, { useEffect, useState } from "react";
import Article from "./Article";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";

export default function Home() {
  const { user } = useUser();

  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const [posts, setposts] = useState([]);
  const [authStatus, setauthStatus] = useState(false);
  let limit = 10;
  useEffect(() => {
    // console.log(user);
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    } else setauthStatus(false);
  }, [user, token]);
  const getPosts = () => {
    fetch(`http://localhost:5000/followedposts?limit=${limit}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setposts([...result]);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // console.log(authStatus);

    if (authStatus) {
      getPosts();
      window.addEventListener("scroll", handlescroll);
      return () => {
        window.removeEventListener("scroll", handlescroll);
      };
    }
  }, [authStatus]);

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
      <div className="row">
        {!authStatus && <p>you're not logged in</p>}
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
