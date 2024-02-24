import React, { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
function PostDetailsp() {
  const { user } = useUser();
  const [token, settoken] = useLocalStorage("instaClone1Token", "");

  const [authStatus, setauthStatus] = useState(false);
  useEffect(() => {
    // console.log(user);
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    } else setauthStatus(false);
  }, [user, token]);

  const params = useParams();
  const postId = params.postId;
  return (
    <>{authStatus && <PostDetails postId={postId} goback={"/profile"} />}</>
  );
}

export default PostDetailsp;
