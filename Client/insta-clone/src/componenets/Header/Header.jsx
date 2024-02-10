import React, { useEffect, useState } from "react";
import Logo from "../../partials/Logo.png";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ButtonsForUnlogged from "./ButtonsForUnlogged";

export default function Header() {
  const { user } = useUser;
  const [authStatus, setauthStatus] = useState(true);
  useEffect(() => {
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    }
  }, [user]);

  return (
    <div className="Header col-lg-12 mt-3   shadow-sm">
      <div className="w-100 flex row mx-2 ">
        <div className="text-start col-4">
          <img src={Logo} alt="" style={{ width: "100px" }} />
        </div>
      </div>
    </div>
  );
}
