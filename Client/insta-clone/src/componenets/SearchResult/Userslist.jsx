import React from "react";
import { Link } from "react-router-dom";
import "./Userslist.css";
function Userslist({ users }) {
  return (
    <>
      {users.map((user) => {
        return (
          <Link
            to={`/user/${user.userName}`}
            key={user._id}
            className="w-100 text-end one-user rounded-4 p-2 m-1 text-decoration-none row  "
          >
            <div
              style={{ width: "70px" }}
              className="col-2 text-decoration-none  align-items-center  m-0"
            >
              <img
                src={user.pfp}
                alt=""
                className=" rounded-circle w-100 justify-content-lg-start mt-2 "
              />
            </div>
            <div className="col-9 justify-content-center align-items-center row text-start">
              <p className="m-0 p-0 text-decoration-none  text-dark fw-medium">
                {user.userName}
              </p>
              <p className="m-0 p-0 text-decoration-none  text-dark ">
                {user.name}
              </p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Userslist;
