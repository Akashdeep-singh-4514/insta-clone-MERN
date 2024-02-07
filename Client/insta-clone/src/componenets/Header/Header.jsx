import React from "react";
import Logo from "../../partials/Logo.png";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="Header col-lg-12 mt-3   shadow-sm">
      <div className="w-100 flex row mx-2 ">
        <div className="text-start col-lg-8">
          <img src={Logo} alt="" style={{ width: "100px" }} />
        </div>
        <div className="flex flex-wrap text-end col-lg-4 ">
          <ul className="list-unstyled flex flex-wrap row ">
            <li className="col-lg-4">
              <Link
                className="text-decoration-none bg-primary-subtle text-black p-1 rounded-1 "
                to="signup"
              >
                Sign-up
              </Link>
            </li>

            <li className="col-lg-4 text-decoration-none ">
              <Link
                className="text-decoration-none bg-primary-subtle text-black p-1 rounded-1 "
                to="signin"
              >
                Sign-in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
