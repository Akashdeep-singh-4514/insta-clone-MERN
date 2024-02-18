import React, { useEffect, useState } from "react";
import "./PostDetails.css";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
function PostDetails({ goback, postId }) {
  const [likepost, setlikepost] = useState(false);
  const [likes, setlikes] = useState([]);
  const [comments, setcomments] = useState([]);
  const [comment, setcomment] = useState([]);

  const [caption, setcaption] = useState("");
  const [postuser, setpostuser] = useState("instagram user");
  const [postUrl, setpostUrl] = useState("");
  const [postuserpfp, setpostuserpfp] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  const { user } = useUser();
  const notifySuccess = (msg) => toast.success(msg);
  const Navigate = useNavigate();

  useEffect(() => {
    // console.log(user);
    fetch("http://localhost:5000/getpost", {
      method: "post",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.post.userId.userName);
        setlikes(data.post.likes);
        setcomments(data.post.comments);
        setcaption(data.post.content);
        setpostuser(data.post.userId.userName);
        setpostuserpfp(data.post.userId.pfp);
        setpostUrl(data.post.image);
        if (data.liked) {
          setlikepost(true);
        } else {
          setlikepost(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const likePost = () => {
    likes.length += 1;
    fetch(`http://localhost:5000/likepost`, {
      method: "put",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = () => {
    likes.length -= 1;

    fetch(`http://localhost:5000/unlikepost`, {
      method: "put",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addCommet = () => {
    fetch(`http://localhost:5000/addcomment`, {
      method: "put",
      body: JSON.stringify({ postId, text: comment }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setcomments([
      ...comments,
      { userName: user.userName, comment: comment, userId: "" },
    ]);
    setcomment("");
    notifySuccess("comment posted");
  };
  return (
    <>
      <div className="container w-75 my-4  text-start ">
        <span
          className="material-symbols-outlined close-btn p-2  text-start rounded-circle "
          onClick={() => {
            Navigate(goback);
          }}
        >
          close
        </span>
        <div className="row m-auto">
          <div className="col-6 text-start ">
            <img src={postUrl} alt="post" className=" w-100" />
          </div>
          <div className="col-6 card p-0">
            <div className="card-header  nav align-items-center  col-12 text-start flex-wrap">
              <img
                src={postuserpfp}
                alt="pfp"
                width="50px"
                className="rounded-circle    "
              />
              <h5 className="w-50 mx-2  nav-item  ">{postuser}</h5>
            </div>
            <div className="col-12 card-body text-start py-3">
              {comments.map((com) => {
                // console.log(com);

                return (
                  <p key={com.userId} className="comment">
                    <b>{com.userName}</b> {com.comment}
                  </p>
                );
              })}
            </div>
            <div className="card-footer text-start">
              {likepost && (
                <span
                  className={`material-symbols-outlined -red text-danger
            }`}
                  onClick={() => {
                    setlikepost(false);
                    unlikePost();
                  }}
                >
                  favorite
                </span>
              )}
              {!likepost && (
                <span
                  className={`material-symbols-outlined
            }`}
                  onClick={() => {
                    setlikepost(true);
                    likePost();
                  }}
                >
                  favorite
                </span>
              )}
              <p className="fw-medium ">{likes ? likes.length : 0} like</p>
              <p>{caption}</p>

              <div className="flex nav align-items-center ">
                <span className="material-symbols-outlined mx-2">mood</span>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Add a comment"
                  className="w-75 border-0 p-1"
                  value={comment}
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className={`mx-2 border-0 rounded-1 ${
                    comment.length > 0
                      ? "bg-info text-light"
                      : "bg-transparent text-dark"
                  }`}
                  onClick={() => {
                    addCommet();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetails;
