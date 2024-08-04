import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useLocalStorage from "use-local-storage";

function FollowComponent({ ProfileUser, followerslength, setfollowerslength }) {
  const [followed, setfollowed] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  useEffect(() => {
    fetch(
      `https://insta-clone-mern-bakend.onrender.com/ifyoufollowed/${ProfileUser._id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.following) {
          setfollowed(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const follow = () => {
    fetch(`https://insta-clone-mern-bakend.onrender.com/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: ProfileUser._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          notifySuccess(`followed ${ProfileUser.userName}`);
          setfollowed(true);
          setfollowerslength(followerslength + 1);
        } else if (data.error) {
          notifyError(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  const unfollow = () => {
    if (window.confirm(`do you wanna unfollow ${ProfileUser.userName}`)) {
      fetch(`https://insta-clone-mern-bakend.onrender.com/unfollow`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: ProfileUser._id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            notifySuccess(`unfollowed ${ProfileUser.userName}`);
            setfollowed(false);
            setfollowerslength(followerslength - 1);
          } else if (data.error) {
            notifyError(data.error);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {followed && (
        <span
          onClick={() => {
            unfollow();
          }}
          style={{ cursor: "pointer" }}
          className={`bg-secondary-subtle fw-medium p-2 rounded-2 `}
        >
          following
        </span>
      )}
      {!followed && (
        <span
          onClick={() => {
            follow();
          }}
          style={{ cursor: "pointer" }}
          className={`bg-info-subtle fw-medium p-2 rounded-2 `}
        >
          follow
        </span>
      )}
    </>
  );
}

export default FollowComponent;
