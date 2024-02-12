import React, { useEffect, useState } from "react";
import Logo from "../../partials/Logo.png";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ButtonsForUnlogged from "./ButtonsForUnlogged";
import ButtonsforLoggedin from "./ButtonsforLoggedin";
import useLocalStorage from "use-local-storage";

export default function Header() {
  const { user } = useUser();
  const [authStatus, setauthStatus] = useState(true);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  // useEffect(() => {
  //   // console.log(user);
  //   if (user && user.loggedIn) {
  //     setauthStatus(user.loggedIn);
  //   } else setauthStatus(false);
  // }, [user, token]);

  return (
    <div className="nav w-100 shadow-sm align-items-center">
      <div className=" ">
        <Link to="/">
          <img src={Logo} alt="" style={{ width: "100px" }} className="mx-3" />
        </Link>
      </div>
      {!authStatus && <ButtonsForUnlogged />}
      {authStatus && <ButtonsforLoggedin />}
    </div>
  );
}
