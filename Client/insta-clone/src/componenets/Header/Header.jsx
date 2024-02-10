import React, { useEffect, useState } from "react";
import Logo from "../../partials/Logo.png";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ButtonsForUnlogged from "./ButtonsForUnlogged";
import ButtonsforLoggedin from "./ButtonsforLoggedin";
import useLocalStorage from "use-local-storage";

export default function Header() {
  const { user } = useUser();
  const [authStatus, setauthStatus] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  useEffect(() => {
    // console.log(user);
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    } else setauthStatus(false);
  }, [user, token]);

  return (
    <div className="Header col-lg-12 mt-3   shadow-sm">
      <div className="w-100 flex  mx-2 nav ">
        <div className="text-start  nav-item" style={{ marginRight: "10%" }}>
          <img src={Logo} alt="" style={{ width: "100px" }} />
        </div>
        {!authStatus && <ButtonsForUnlogged />}
        {authStatus && <ButtonsforLoggedin />}
      </div>
    </div>
  );
}
