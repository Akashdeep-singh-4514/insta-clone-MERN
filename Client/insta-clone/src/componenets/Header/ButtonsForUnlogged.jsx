import React from "react";
import { Link } from "react-router-dom";
function ButtonsForUnlogged() {
  return (
    <>
      <li className="col-5">
        <Link
          className=" btn text-decoration-none bg-primary-subtle text-black p-1 rounded-1 "
          to="signup"
        >
          Sign-up
        </Link>
      </li>

      <li className="col-5">
        <Link
          className=" btn text-decoration-none bg-primary-subtle text-black p-1 rounded-1 "
          to="signin"
        >
          Sign-in
        </Link>
      </li>
    </>
  );
}

export default ButtonsForUnlogged;
