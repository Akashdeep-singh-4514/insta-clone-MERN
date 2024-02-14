import React, { useEffect, useState } from "react";
import Article from "./Article";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";

export default function Home() {
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
    <>
      {!authStatus && <p>you're not logged in</p>}
      {authStatus && <Article />}
    </>
  );
}
