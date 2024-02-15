import React, { useEffect, useState } from "react";
import Article from "./Article";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";

export default function Home() {
  const { user } = useUser();
  const [authStatus, setauthStatus] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const [posts, setposts] = useState([]);
  useEffect(() => {
    // console.log(user);
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    } else setauthStatus(false);
  }, [user, token]);

  useEffect(() => {
    // console.log(authStatus);
    if (authStatus) {
      fetch("http://localhost:5000/allposts", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((posts) => setposts(posts))
        .catch((err) => console.log(err));
    }
  }, [authStatus]);
  return (
    <>
      <div className="row">
        {!authStatus && <p>you're not logged in</p>}
        {authStatus &&
          posts.map((post) => (
            <Article
              key={post._id}
              username={post.userId.userName}
              postUrl={post.image}
              caption={post.caption}
            />
          ))}
      </div>
    </>
  );
}
