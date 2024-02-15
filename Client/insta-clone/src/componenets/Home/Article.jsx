import React from "react";

export default function Article({
  username = "Instagram user",
  postUrl,
  pfp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  caption,
}) {
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
          <span className="material-symbols-outlined">favorite</span>
          <p className="fw-medium ">1 like</p>
          <p>{caption}</p>
          <div className="flex nav align-items-center ">
            <span className="material-symbols-outlined mx-2">mood</span>
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a comment"
              className="w-75 border-0 p-1"
            />
            <button
              type="button"
              className="mx-2 border-0 bg-transparent  text-info"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
