import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Userslist from "../SearchResult/Userslist";

function Followers() {
  const [followList, setFollowList] = useState([]);
  const { userName } = useParams();
  const [token, setToken] = useLocalStorage("instaCloneToken", "");

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await fetch(
          `https://insta-clone-mern-bakend.onrender.com/followers/${userName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setFollowList(data.followers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFollowers();
  }, [userName, token]);

  return (
    <>
      <h3 className="text-capitalize">followers</h3>
      <div className="w-50 m-auto">
        <div className="w-75 m-auto mt-2">
          {followList && <Userslist users={followList} />}
        </div>
      </div>
    </>
  );
}

export default Followers;
