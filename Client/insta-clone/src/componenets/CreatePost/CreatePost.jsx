import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import CreatePostForm from "./CreatePostForm";
import { useNavigate } from "react-router-dom";

function CreatePost() {
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
    <>
      {!authStatus && <p>you're not logged in</p>}
      {authStatus && <CreatePostForm />}
    </>
  );
}

export default CreatePost;
