import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import ProfileFrame from "../Profile/ProfileFrame";
import { useUser } from "../../contexts/UserContext";

function OtherProfile({}) {
  const { userId } = useParams();
  const [Profileuser, setProfileuser] = useState({});
  const [profileupdation, setprofileupdation] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const { user } = useUser();
  const [authStatus, setauthStatus] = useState(false);

  useEffect(() => {
    // console.log(user);
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    } else setauthStatus(false);
  }, [user, token]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProfileuser(data);
        setprofileupdation(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* <p
        onClick={() => {
          console.log(user);
        }}
      >
        {userId}
      </p> */}
      {authStatus && profileupdation && Profileuser && (
        <ProfileFrame ProfileUser={Profileuser} />
      )}
    </div>
  );
}

export default OtherProfile;
