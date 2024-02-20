import React, { useEffect, useState } from "react";
import PostsSection from "./PostsSection";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";

function ProfileFrame({ ProfileUser }) {
  const { user } = useUser();
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const [posts, setposts] = useState([]);
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const [followers, setfollowers] = useState(
    ProfileUser.followers ? ProfileUser.followers : []
  );
  const [following, setfollowing] = useState(
    ProfileUser.following ? ProfileUser.following : []
  );
  const [currentuser, setcurrentuser] = useState(false);
  const [followed, setfollowed] = useState(false);

  // console.log(user);
  useEffect(() => {
    // console.log(authStatus);
    // console.log("user:", user);
    // console.log("pro:", ProfileUser);
    if (user._id == ProfileUser._id) {
      setcurrentuser(true);
    }
    fetch(`http://localhost:5000/userposts/${ProfileUser._id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((posts) => {
        setposts(posts.sort((a, b) => b.date - a.date));
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/ifyoufollowed/${ProfileUser._id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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
    fetch(`http://localhost:5000/follow`, {
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
        } else if (data.error) {
          notifyError(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  const unfollow = () => {
    fetch(`http://localhost:5000/unfollow`, {
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
        } else if (data.error) {
          notifyError(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className=" justify-content-center row mx-2 mt-5 mb-5">
        <div className="col-12 shadow-sm pb-4 ">
          <div className=" m-auto flex-wrap row w-75">
            {/* profile photo */}
            <div className="" style={{ width: "40%" }}>
              <img
                src={ProfileUser.pfp}
                alt="pfp"
                className="w-50 object-fit-contain rounded-circle  "
              />
            </div>
            <div
              className="text-start text-lowercase "
              style={{ width: "50%" }}
            >
              <h3>
                {ProfileUser.userName ? ProfileUser.userName : "Instagram User"}
              </h3>
              <div className="row text-center ">
                <div className="col-lg-4">
                  <div className="row w-100">
                    <p className="col-lg-7 fw-medium m-1">{posts.length}</p>
                    <p className="col-lg-7 text-capitalize fw-medium">posts</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row w-100">
                    <p className="col-lg-7 m-1 fw-medium">{followers.length}</p>
                    <p className="col-lg-7 fw-medium text-capitalize ">
                      followers
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row w-100">
                    <p className="col-lg-7 fw-medium m-1">{following.length}</p>
                    <p className="col-lg-7 fw-medium  text-capitalize ">
                      following
                    </p>
                  </div>
                </div>
                <div className="  col-lg-4">
                  {currentuser && (
                    <span
                      style={{ cursor: "pointer" }}
                      className={`bg-secondary-subtle fw-medium p-2 rounded-2 `}
                    >
                      editprofile
                    </span>
                  )}
                  {!currentuser && followed && (
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
                  {!currentuser && !followed && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        follow();
                      }}
                      className={`bg-info-subtle fw-medium p-2 rounded-2 `}
                    >
                      follow
                    </span>
                  )}
                </div>
                {/* <div className="col-lg-4"></div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="col-4 row text-center p-0">
            <span className="material-symbols-outlined  ">post</span>
            <p className="">posts</p>
          </div>
          {/* <div className="col-4"></div>
          <div className="col-4"></div> */}
        </div>
        <PostsSection posts={posts} />
      </div>
    </>
  );
}

export default ProfileFrame;
