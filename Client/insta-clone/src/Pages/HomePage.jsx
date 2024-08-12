import React, { useEffect, useState } from "react";
import { Header } from "../componenets";
import { Outlet, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { useUser } from "../contexts/UserContext";

export default function HomePage() {
  const { user } = useUser();
  const Navigate = useNavigate();
  const [authStatus, setauthStatus] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  useEffect(() => {
    // console.log(user);
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    } else {
      Navigate("/");
      settoken("");
      setauthStatus(false);
    }
  }, [user, token]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
