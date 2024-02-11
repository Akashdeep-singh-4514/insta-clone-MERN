import React from "react";

export default function Home() {
  return (
    <>
      <article className="w-100 d-flex mt-3 justify-content-center">
        <div className="card col-3 " style={{ width: "500px" }}>
          <div className="card-header nav align-items-center   text-start flex-wrap">
            <img
              src="https://images.unsplash.com/photo-1541576980233-97577392db9a?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width="50px"
              className="rounded-circle nav-item  "
            />
            <h5 className="w-70 mx-2  nav-item  ">username</h5>
          </div>
          <div className="card-body p-0 ">
            <div className="card-img  ">
              <img
                src="https://images.unsplash.com/photo-1580164631075-b3f1304f4051?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-100 "
              />
            </div>
          </div>
          <div className="card-footer text-start">
            <span className="material-symbols-outlined">favorite</span>
            <p className="fw-medium ">1 like</p>
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
    </>
  );
}
