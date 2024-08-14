import React, { useEffect, useState } from "react";
import Article from "./Article";
import useLocalStorage from "use-local-storage";

export default function Home() {
  const [loading, setLoading] = useState(true); // Start with loading true
  const [token] = useLocalStorage("instaCloneToken", "");
  const [posts, setPosts] = useState([]);
  let limit = 10;
  useEffect(() => {
    if (token) getPosts();
  }, [token]);
  const getPosts = async () => {
    // //console.log("Fetching posts...");
    // //console.log(token);

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
      //console.log("Fetched posts:", result);

      if (result.length > 0) {
        setPosts((prevPosts) => {
          // Filter out any posts that already exist in the state
          const newPosts = result.filter(
            (post) => !prevPosts.some((p) => p._id === post._id)
          );
          return [...prevPosts, ...newPosts];
        });
      } else {
        console.log("No more posts to fetch.");
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
    const handleScroll = () => {
      if (
        document.documentElement.clientHeight + window.pageYOffset >=
        document.documentElement.scrollHeight
      ) {
        limit += 10;
        getPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="row">
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>
          No posts available. You haven't followed anyone yet. Explore to find
          interesting content!
        </p>
      ) : (
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
        ))
      )}
    </div>
  );
}
