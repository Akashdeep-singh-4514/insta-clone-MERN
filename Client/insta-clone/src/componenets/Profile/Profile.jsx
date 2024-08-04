import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import ProfileFrame from "./ProfileFrame";

function Profile() {
  const { user } = useUser();
  const [authStatus, setAuthStatus] = useState(false);
  const [token] = useLocalStorage("instaCloneToken", "");
  const [profileUser, setProfileUser] = useState(null);
  const [userUpdated, setUserUpdated] = useState(false);

  useEffect(() => {
    // Update authentication status based on user login state
    setAuthStatus(user?.loggedIn ?? false);
  }, [user]);

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://insta-clone-mern-bakend.onrender.com/getuser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }

        const data = await response.json();
        setProfileUser(data);
        setUserUpdated(true);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (authStatus) {
      fetchUserProfile();
    }
  }, [authStatus, token]);

  return (
    <>
      {!authStatus && <p>You're not logged in</p>}
      {authStatus && userUpdated && profileUser && (
        <ProfileFrame ProfileUser={profileUser} currentuser={true} />
      )}
    </>
  );
}

export default Profile;
