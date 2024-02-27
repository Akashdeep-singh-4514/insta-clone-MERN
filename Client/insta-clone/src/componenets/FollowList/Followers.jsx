import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Userslist from "../SearchResult/Userslist";

function Followers() {
  const [followlist, setfollowlist] = useState([]);
  const { userName } = useParams();
  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  useEffect(() => {
    fetch(`http://localhost:5000/followers/${userName}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.followers);
        setfollowlist(data.followers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h3 className="text-capitalize ">followers</h3>
      <div className="w-50 m-auto ">
        <div className="w-75 m-auto  mt-2">
          {followlist && <Userslist users={followlist} />}
        </div>
      </div>
    </>
  );
}

export default Followers;
