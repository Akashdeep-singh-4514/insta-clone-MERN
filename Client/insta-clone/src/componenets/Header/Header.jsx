import React, { useEffect, useState } from "react";
import Logo from "../../partials/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ButtonsForUnlogged from "./ButtonsForUnlogged";
import ButtonsforLoggedin from "./ButtonsforLoggedin";
import useLocalStorage from "use-local-storage";

export default function Header() {
  const { user } = useUser();
  const Navigate = useNavigate();

  const [authStatus, setauthStatus] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  useEffect(() => {
    // console.log(user);
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    } else {
      Navigate("/signin");
      settoken("");
      setauthStatus(false);
    }
  }, [user, token]);

  return (
    <div className="nav w-100 shadow-sm align-items-center">
      <div className=" ">
        <Link to="/">
          <img src={Logo} alt="" style={{ width: "150px" }} className="mx-3" />
        </Link>
      </div>
      {!authStatus && <ButtonsForUnlogged />}
      {authStatus && <ButtonsforLoggedin />}
    </div>
  );
}
