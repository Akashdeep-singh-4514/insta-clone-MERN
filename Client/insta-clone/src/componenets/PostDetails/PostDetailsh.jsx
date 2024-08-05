import React, { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";

function PostDetailsh() {
  const { user } = useUser();
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const Navigate = useNavigate();

  const [authStatus, setauthStatus] = useState(false);
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

  const params = useParams();
  const postId = params.postId;
  return <>{authStatus && <PostDetails postId={postId} goback={"/"} />}</>;
}

export default PostDetailsh;
