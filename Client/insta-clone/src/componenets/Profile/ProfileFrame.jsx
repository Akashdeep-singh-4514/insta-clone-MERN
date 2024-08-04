import React, { useEffect, useState, useRef } from "react";
import PostsSection from "./PostsSection";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ProfileFrame.css";
import FollowComponent from "./FollowComponent";

function ProfileFrame({ ProfileUser }) {
  const Navigate = useNavigate();
  const { user } = useUser();
  const [token] = useLocalStorage("instaCloneToken", "");
  const [posts, setPosts] = useState([]);
  const [changePFP, setChangePFP] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [followersLength, setFollowersLength] = useState(
    ProfileUser ? ProfileUser.followers.length : 0
  );
  const [currentUser, setCurrentUser] = useState(false);
  const inputFile = useRef();

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  useEffect(() => {
    if (user._id === ProfileUser._id) {
      setCurrentUser(true);
    }
  }, [ProfileUser, user._id]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://insta-clone-mern-bakend.onrender.com/userposts/${ProfileUser._id}?limit=10`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();

    const handleScroll = () => {
      if (
        document.documentElement.clientHeight + window.pageYOffset >=
        document.documentElement.scrollHeight
      ) {
        // Load more posts if necessary
        limit += 10;
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ProfileUser._id, token]);

  useEffect(() => {
    if (image) {
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "insta-clone");
        formData.append("cloud_name", "dtx0nm3oa");

        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dtx0nm3oa/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) {
            throw new Error(`Error uploading image: ${response.statusText}`);
          }
          const data = await response.json();
          setImageUrl(data.url);
        } catch (err) {
          console.error("Error uploading image:", err);
        }
      };

      uploadImage();
    }
  }, [image]);

  useEffect(() => {
    if (imageUrl) {
      const changeProfilePicture = async () => {
        try {
          const response = await fetch(
            "https://insta-clone-mern-bakend.onrender.com/changepfp",
            {
              method: "PUT",
              body: JSON.stringify({ image: imageUrl }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(
              `Error changing profile picture: ${response.statusText}`
            );
          }
          const data = await response.json();
          notifySuccess(data.message);
          window.location.reload();
        } catch (err) {
          notifyError(err.message);
        }
      };

      changeProfilePicture();
    }
  }, [imageUrl, token]);

  const removeProfilePicture = async () => {
    try {
      const response = await fetch(
        "https://insta-clone-mern-bakend.onrender.com/removepfp",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Error removing profile picture: ${response.statusText}`
        );
      }
      const data = await response.json();
      notifySuccess(data.message);
      window.location.reload();
    } catch (err) {
      notifyError(err.message);
    }
  };

  return (
    <div className="justify-content-center row mx-2 mt-5 mb-5">
      <div className="col-12 shadow-sm pb-4">
        <div className="m-auto flex-wrap row w-75">
          <div
            className="row text-start"
            style={{ width: "400px", height: "200px" }}
          >
            <img
              onClick={() => setChangePFP(!changePFP)}
              src={currentUser ? user.pfp : ProfileUser.pfp}
              alt="pfp"
              className="w-50 thumb-post-img col-lg-12 object-fit-cover"
            />
            {currentUser && changePFP && (
              <p className="col-lg-12 mx-4 mt-2">
                <span
                  onClick={() => inputFile.current.click()}
                  style={{ cursor: "pointer" }}
                  className="px-2 mx-1 py-1 text-primary bg-secondary-subtle rounded"
                >
                  Change
                </span>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={inputFile}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <span
                  onClick={removeProfilePicture}
                  style={{ cursor: "pointer" }}
                  className="px-2 py-1 text-danger bg-secondary-subtle rounded"
                >
                  Remove
                </span>
              </p>
            )}
          </div>
          <div className="text-start text-lowercase" style={{ width: "50%" }}>
            <h3>{ProfileUser ? ProfileUser.userName : "Instagram User"}</h3>
            <div className="row text-center">
              <div className="col-4">
                <div className="row w-100">
                  <p className="col-lg-7 fw-medium m-1">{posts.length}</p>
                  <p className="col-lg-7 text-capitalize fw-medium">posts</p>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="row w-100"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    Navigate(
                      `/followers/${
                        ProfileUser ? ProfileUser.userName : "Instagram User"
                      }`
                    )
                  }
                >
                  <p className="col-lg-7 m-1 fw-medium">{followersLength}</p>
                  <p className="col-lg-7 fw-medium text-capitalize">
                    followers
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="row w-100"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    Navigate(
                      `/following/${
                        ProfileUser ? ProfileUser.userName : "Instagram User"
                      }`
                    )
                  }
                >
                  <p className="col-lg-7 fw-medium m-1">{following.length}</p>
                  <p className="col-lg-7 fw-medium text-capitalize">
                    following
                  </p>
                </div>
              </div>
              {!currentUser && (
                <div className="col-lg-4">
                  <FollowComponent
                    ProfileUser={ProfileUser}
                    followersLength={followersLength}
                    setFollowersLength={setFollowersLength}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="col-4 row text-center p-0">
          <span className="material-symbols-outlined">post</span>
          <p>posts</p>
        </div>
        <PostsSection posts={posts} url="post" />
      </div>
    </div>
  );
}

export default ProfileFrame;
