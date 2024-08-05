import React, { useEffect, useState } from "react";
import "./PostDetails.css";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

function PostDetails({ goback, postId }) {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isOwnPost, setIsOwnPost] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [caption, setCaption] = useState("");
  const [postUser, setPostUser] = useState("instagram user");
  const [postUrl, setPostUrl] = useState("");
  const [postUserPfp, setPostUserPfp] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const [token] = useLocalStorage("instaCloneToken", "");
  const { user } = useUser();
  const navigate = useNavigate();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          "https://insta-clone-mern-bakend.onrender.com/getpost",
          {
            method: "POST",
            body: JSON.stringify({ postId }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data.post.userId.userName);

        setLikes(data.post.likes);
        setComments(data.post.comments);
        setCurrentUserId(data.post.userId._id);
        setCaption(data.post.content);
        setPostUser(data.post.userId.userName);
        setPostUserPfp(data.post.userId.pfp);
        setPostUrl(data.post.image);

        setIsPostLiked(data.liked);
        setIsOwnPost(user._id === data.post.userId._id);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId, token, user._id]);

  const likePost = async () => {
    try {
      await fetch("https://insta-clone-mern-bakend.onrender.com/likepost", {
        method: "PUT",
        body: JSON.stringify({ postId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLikes((prevLikes) => [...prevLikes, user._id]);
      setIsPostLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const unlikePost = async () => {
    try {
      await fetch("https://insta-clone-mern-bakend.onrender.com/unlikepost", {
        method: "PUT",
        body: JSON.stringify({ postId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLikes((prevLikes) => prevLikes.filter((id) => id !== user._id));
      setIsPostLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const addComment = async () => {
    try {
      await fetch("https://insta-clone-mern-bakend.onrender.com/addcomment", {
        method: "PUT",
        body: JSON.stringify({ postId, text: commentText }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setComments((prevComments) => [
        ...prevComments,
        { userName: user.userName, comment: commentText, userId: user._id },
      ]);
      setCommentText("");
      notifySuccess("Comment posted");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deletePost = async () => {
    if (window.confirm("Do you really want to delete the post?")) {
      try {
        const response = await fetch(
          `https://insta-clone-mern-bakend.onrender.com/deletepost/${postId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        if (data.message) {
          notifySuccess(data.message);
          navigate(goback);
        } else if (data.error) {
          notifyError(data.error);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="container w-75 my-4 text-start">
      <span
        className="material-symbols-outlined close-btn p-2 text-start rounded-circle"
        onClick={() => navigate(goback)}
      >
        west
      </span>
      <div className="row m-auto">
        <div className="col-6 text-start">
          <img src={postUrl} alt="post" className="m-auto w-100" />
        </div>
        <div className="col-6 card p-0">
          <div
            style={{ cursor: "pointer" }}
            className="card-header nav align-items-center col-12 text-start flex-wrap"
          >
            <img
              src={postUserPfp}
              alt="pfp"
              width="50px"
              className="rounded-circle"
              onClick={() => navigate(`/user/${postUser}`)}
              style={{ cursor: "pointer" }}
            />
            <h5
              className="w-50 mx-2 nav-item"
              onClick={() => navigate(`/user/${postUser}`)}
            >
              {postUser}
            </h5>
            {isOwnPost && (
              <span
                onClick={deletePost}
                className="material-symbols-outlined close-btn p-2 rounded-circle text-end"
              >
                delete
              </span>
            )}
          </div>
          <div
            className="col-12 card-body text-start py-3"
            style={{ height: "40vh" }}
          >
            {comments.map((com) => (
              <p key={com.userId} className="comment">
                <b
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/user/${com.userName}`)}
                >
                  {com.userName}
                </b>{" "}
                {com.comment}
              </p>
            ))}
          </div>
          <div className="card-footer text-start">
            {isPostLiked ? (
              <span
                className="material-symbols-outlined text-danger"
                onClick={unlikePost}
              >
                favorite
              </span>
            ) : (
              <span className="material-symbols-outlined" onClick={likePost}>
                favorite
              </span>
            )}
            <p className="fw-medium">{likes.length} like</p>
            <p>{caption}</p>

            <div className="flex nav align-items-center">
              <span className="material-symbols-outlined mx-2">mood</span>
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Add a comment"
                className="w-75 border-0 p-1"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                type="button"
                className={`mx-2 border-0 rounded-1 ${
                  commentText.length > 0
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
      </div>
    </div>
  );
}

export default PostDetails;
