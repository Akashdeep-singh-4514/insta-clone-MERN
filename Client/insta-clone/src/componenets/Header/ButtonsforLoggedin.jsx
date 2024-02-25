import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import { Link, useNavigate } from "react-router-dom";
export default function ButtonsforLoggedin() {
  const { user, deleteUser } = useUser();
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const [searchtxt, setsearchtxt] = useState("");
  const Navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("do you really wanna log out?")) {
      settoken("");
      deleteUser();
    }
  };
  useEffect(() => {
    if (searchtxt.length > 0) {
      Navigate(`search/${searchtxt}`);
    }
  }, [searchtxt]);

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
          value={searchtxt}
          onChange={(e) => {
            setsearchtxt(e.target.value);
          }}
        />
        <Link to={searchtxt.length > 0 ? `search/${searchtxt}` : ""}>
          <span className=" text-black material-symbols-outlined mx-1 ">
            search
          </span>
        </Link>
      </div>
      {/* <div style={{ width: "10%" }}></div> */}
      <div className="justify-content-end  nav mt-3 m-auto  align-items-center  ">
        <ul className=" ">
          <Link to="">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              home
            </span>
          </Link>{" "}
          {/* <Link to="">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              chat
            </span>
          </Link>{" "} */}
          <Link to="createpost">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              add_box
            </span>
          </Link>{" "}
          <Link to="/explore">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              explore
            </span>
          </Link>{" "}
          {/* <Link to="">
            <span className=" mx-2 material-symbols-outlined align-items-center text-decoration-none text-black">
              favorite
            </span>
          </Link>{" "} */}
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
