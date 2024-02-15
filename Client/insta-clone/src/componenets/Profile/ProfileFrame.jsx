import React, { useEffect, useState } from "react";
import PostsSection from "./PostsSection";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";

function ProfileFrame({}) {
  const { user } = useUser();

  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const [posts, setposts] = useState([]);

  // console.log(user);
  useEffect(() => {
    // console.log(authStatus);

    fetch("http://localhost:5000/myprofile", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((posts) => {
        setposts(posts);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className=" justify-content-center row mx-2 mt-5 mb-5">
        <div className="col-12 shadow-sm pb-4 ">
          <div className=" m-auto flex-wrap row w-75">
            {/* profile photo */}
            <div className="" style={{ width: "40%" }}>
              <img
                src="https://images.unsplash.com/photo-1541576980233-97577392db9a?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="pfp"
                className="w-50 object-fit-contain rounded-circle  "
              />
            </div>
            <div
              className="text-start text-lowercase "
              style={{ width: "50%" }}
            >
              <h3>{user.userName ? user.userName : "Instagram User"}</h3>
              <div className="row text-center ">
                <div className="col-lg-4">
                  <div className="row w-100">
                    <p className="col-lg-7 fw-medium m-1">{posts.length}</p>
                    <p className="col-lg-7 text-capitalize fw-medium">posts</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row w-100">
                    <p className="col-lg-7 m-1 fw-medium">0</p>
                    <p className="col-lg-7 fw-medium text-capitalize ">
                      followers
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row w-100">
                    <p className="col-lg-7 fw-medium m-1">0</p>
                    <p className="col-lg-7 fw-medium  text-capitalize ">
                      following
                    </p>
                  </div>
                </div>
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
