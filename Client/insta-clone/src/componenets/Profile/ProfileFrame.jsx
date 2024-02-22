import React, { useEffect, useState, useRef } from "react";
import PostsSection from "./PostsSection";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ProfileFrame.css";
function ProfileFrame({ ProfileUser }) {
  const Navigate = useNavigate();
  const { user } = useUser();
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const [posts, setposts] = useState([]);
  const [changePFP, setchangePFP] = useState(false);
  const [imageurl, setimageurl] = useState("");
  const [image, setimage] = useState("");
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const inputfile = useRef();
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
  const removepfp = () => {
    fetch("http://localhost:5000/removepfp", {
      method: "put",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyError(data.error);
        } else if (data.message) {
          notifySuccess(data.message);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dtx0nm3oa");
      fetch("https://api.cloudinary.com/v1_1/dtx0nm3oa/image/upload", {
        method: "Post",
        body: data,
      })
        .then((res) => res.json())
        .then((da) => setimageurl(da.url))
        .catch((err) => console.log(err));
    } else {
      notifyError("add an Image first");
    }
  }, [image]);

  useEffect(() => {
    if (imageurl) {
      fetch("http://localhost:5000/changepfp", {
        method: "put",
        body: JSON.stringify({
          image: imageurl,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyError(data.error);
          } else if (data.message) {
            notifySuccess(data.message);
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    }
  }, [imageurl]);

  return (
    <>
      <div className=" justify-content-center row mx-2 mt-5 mb-5">
        <div className="col-12 shadow-sm pb-4 ">
          <div className=" m-auto flex-wrap row w-75">
            {/* profile photo */}
            <div className="row text-start" style={{ width: "40%" }}>
              <img
                onClick={() => {
                  setchangePFP(!changePFP);
                }}
                src={ProfileUser.pfp}
                alt="pfp"
                className="w-50 thumb-post-img col-lg-12   rounded-circle  "
              />
              {changePFP && (
                <p className="col-lg-12 mx-4 mt-2">
                  <span
                    onClick={() => {
                      inputfile.current.click();
                    }}
                    style={{ cursor: "pointer" }}
                    className="px-2 mx-1 py-1 text-primary  bg-secondary-subtle rounded"
                  >
                    change
                  </span>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    name=""
                    id=""
                    ref={inputfile}
                    onChange={(e) => {
                      setimage(e.target.files[0]);
                    }}
                  />
                  <span
                    onClick={() => {
                      removepfp();
                    }}
                    style={{ cursor: "pointer" }}
                    className="px-2 py-1 text-danger  bg-secondary-subtle rounded"
                  >
                    remove
                  </span>{" "}
                </p>
              )}
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
                  {/* {currentuser && (
                    <span
                      style={{ cursor: "pointer" }}
                      className={`bg-secondary-subtle fw-medium p-2 rounded-2 `}
                    >
                      editprofile
                    </span>
                  )} */}
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
