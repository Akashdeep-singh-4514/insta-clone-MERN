import React, { useEffect, useState } from "react";
import "./Article.css";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Article({
  username = "Instagram user",
  postUrl,
  pfp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  caption,
  likes,
  postId,
  userId,
}) {
  const [likePost, setLikePost] = useState(false);
  const [numLikes, setNumLikes] = useState(likes ? likes.length : 0);
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const notifySuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const res = await fetch(
          "https://insta-clone-mern-bakend.onrender.com/ifliked",
          {
            method: "POST",
            body: JSON.stringify({ postId }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await res.json();
        if (data.true >= 0) {
          setLikePost(true);
        } else {
          setLikePost(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkIfLiked();
  }, [postId, user.token]);

  const likePostHandler = async () => {
    setNumLikes(numLikes + 1);
    try {
      await fetch("https://insta-clone-mern-bakend.onrender.com/likepost", {
        method: "PUT",
        body: JSON.stringify({ postId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const unlikePostHandler = async () => {
    setNumLikes(numLikes - 1);
    try {
      await fetch("https://insta-clone-mern-bakend.onrender.com/unlikepost", {
        method: "PUT",
        body: JSON.stringify({ postId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    try {
      await fetch("https://insta-clone-mern-bakend.onrender.com/addcomment", {
        method: "PUT",
        body: JSON.stringify({ postId, text: comment }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setComment("");
      notifySuccess("Comment posted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <article className="w-100 d-flex col-12 mt-3 m-auto justify-content-center">
        <div className="card col-3" style={{ width: "500px" }}>
          <div className="card-header nav align-items-center text-start flex-wrap">
            <img
              src={pfp}
              alt="pfp"
              width="50px"
              height="60px"
              className="rounded-circle nav-item"
              onClick={() => {
                navigate(`/user/${username}`);
              }}
            />
            <h5
              className="w-50 mx-2 nav-item"
              onClick={() => {
                navigate(`/user/${username}`);
              }}
              style={{ cursor: "pointer" }}
            >
              {username}
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="card-img">
              <img src={postUrl} alt="post" className="w-100" />
            </div>
          </div>
          <div className="card-footer text-start">
            {likePost ? (
              <span
                className="material-symbols-outlined-f text-danger"
                onClick={() => {
                  setLikePost(false);
                  unlikePostHandler();
                }}
              >
                favorite
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setLikePost(true);
                  likePostHandler();
                }}
              >
                favorite
              </span>
            )}
            <p className="fw-medium">{numLikes} likes</p>
            <p>{caption}</p>
            <p
              style={{ cursor: "pointer" }}
              className="fw-medium"
              onClick={() => {
                navigate(`allcomments/${postId}`);
              }}
            >
              view comments
            </p>
            <div className="flex nav align-items-center">
              <span className="material-symbols-outlined mx-2">mood</span>
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Add a comment"
                className="w-75 border-0 p-1"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                type="button"
                className={`mx-2 border-0 rounded-1 ${
                  comment.length > 0
                    ? "bg-info text-light"
                    : "bg-transparent text-dark"
                }`}
                onClick={addComment}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
