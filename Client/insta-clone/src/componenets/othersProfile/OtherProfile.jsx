import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import ProfileFrame from "../Profile/ProfileFrame";
import { useUser } from "../../contexts/UserContext";

function OtherProfile() {
  const { userName } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
  const { user } = useUser();
  const [authStatus, setAuthStatus] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    if (user && user.loggedIn) {
      setAuthStatus(user.loggedIn);
    } else {
      Navigate("/signin");
      settoken("");
      setAuthStatus(false);
    }
  }, [user, token]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://insta-clone-mern-bakend.onrender.com/user/${userName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        setProfileUser(data);
        setProfileUpdated(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (authStatus) {
      fetchProfile();
    }
  }, [userName, token, authStatus]);

  return (
    <div>
      {authStatus && profileUpdated && profileUser && (
        <ProfileFrame ProfileUser={profileUser} />
      )}
    </div>
  );
}

export default OtherProfile;
