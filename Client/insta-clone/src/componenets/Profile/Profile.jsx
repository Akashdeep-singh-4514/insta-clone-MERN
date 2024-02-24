import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import ProfileFrame from "./ProfileFrame";

function Profile() {
  const { user } = useUser();
  const [authStatus, setauthStatus] = useState(false);
  const [token, settoken] = useLocalStorage("instaClone1Token", "");
  const [prouser, setprouser] = useState(null);
  const [userupdation, setuserupdation] = useState(false);
  useEffect(() => {
    if (user && user.loggedIn) {
      setauthStatus(user.loggedIn);
    } else setauthStatus(false);
  }, [user, token]);
  useEffect(() => {
    fetch("http://localhost:5000/getuser", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        setprouser(data);
        setuserupdation(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {!authStatus && <p>you're not logged in</p>}
      {authStatus && userupdation && (
        <ProfileFrame ProfileUser={prouser} currentuser={true} />
      )}
    </>
  );
}

export default Profile;
