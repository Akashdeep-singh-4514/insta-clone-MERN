import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function Home() {
  const Navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user.loggedIn) {
      Navigate("/signin");
    }
  }, [user.loggedIn]);

  return <div>{user.userName}</div>;
}
