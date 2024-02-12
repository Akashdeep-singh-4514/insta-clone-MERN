import React, { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import { Link } from "react-router-dom";
export default function ButtonsforLoggedin() {
  const { user, deleteUser } = useUser();
  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  const handleLogout = () => {
    settoken("");
    deleteUser();
  };
  // useEffect(() => {
  //   // console.log(user);
  //   // console.log(token);
  // }, [user, token]);

  return (
    <>
      <div className="" style={{ width: "20%" }}></div>
      <div className=" justify-content-end w-25 nav  ">
        <input
          type="text"
          name="search"
          id="seach"
          placeholder="search"
          className="w-75 rounded-2 "
        />
        <span className="material-symbols-outlined mx-1 ">search</span>
      </div>
      <div className="justify-content-end nav mt-3 align-items-center  ">
        <ul className=" ">
          <Link to="">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              home
            </span>
          </Link>{" "}
          <Link to="">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              chat
            </span>
          </Link>{" "}
          <Link to="createpost">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              add_box
            </span>
          </Link>{" "}
          <Link to="">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              explore
            </span>
          </Link>{" "}
          <Link to="">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              favorite
            </span>
          </Link>{" "}
          <Link to="profile">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              account_circle
            </span>
          </Link>
        </ul>
        <p
          className="mx-5 p-2 text-capitalize  rounded-1 btn fw-medium  bg-danger-subtle"
          onClick={() => {
            handleLogout();
          }}
        >
          logout
        </p>
      </div>
    </>
  );
}
