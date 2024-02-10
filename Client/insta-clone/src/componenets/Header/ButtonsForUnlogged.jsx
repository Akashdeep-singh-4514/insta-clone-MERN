import React from "react";
import { Link } from "react-router-dom";
function ButtonsForUnlogged() {
  return (
    <>
      <div className="w-50 nav text-end mb-3 align-items-end justify-content-end ">
        <li className="nav-item mx-2 text-end">
          <Link
            className=" btn text-decoration-none bg-primary-subtle text-black p-1 rounded-1 "
            to="signup"
          >
            Sign-up
          </Link>
        </li>

        <li className="nav-item mx-2 text-end ">
          <Link
            className=" btn text-decoration-none bg-primary-subtle text-black p-1 rounded-1 "
            to="signin"
          >
            Sign-in
          </Link>
        </li>
      </div>
    </>
  );
}

export default ButtonsForUnlogged;
