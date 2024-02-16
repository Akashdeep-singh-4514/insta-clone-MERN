import React, { useEffect, useState } from "react";
import "./Article.css";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";
export default function Article({
  username = "Instagram user",
  postUrl,
  pfp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  caption,
  likes,
  postId,
}) {
  // console.log(pfp);
  const [likepost, setlikepost] = useState(false);
  const [numlikes, setnumlikes] = useState(likes ? likes.length : 0);
  const [comment, setcomment] = useState("");
  const { user } = useUser();
  const notifySuccess = (msg) => toast.success(msg);

  useEffect(() => {
    // console.log(likepost);
    fetch("http://localhost:5000/ifliked", {
      method: "post",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.true >= 0) {
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
    setnumlikes(numlikes + 1);
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
    setnumlikes(numlikes - 1);
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

    setcomment("");
    notifySuccess("comment posted");
  };
  return (
    <article className="w-100 d-flex col-12  mt-3 m-auto  justify-content-center">
      <div className="card col-3 " style={{ width: "500px" }}>
        <div className="card-header nav align-items-center   text-start flex-wrap">
          <img
            src={pfp}
            alt="pfp"
            width="50px"
            className="rounded-circle nav-item  "
          />
          <h5 className="w-70 mx-2  nav-item  ">{username}</h5>
        </div>
        <div className="card-body p-0 ">
          <div className="card-img  ">
            <img src={postUrl} alt="post" className="w-100 " />
          </div>
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
          <p className="fw-medium ">{numlikes} like</p>
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
    </article>
  );
}
