import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Userslist from "./Userslist";

function SearchResult() {
  const { searchtext } = useParams();
  const [users, setusers] = useState([]);
  const [resultfound, setresultfound] = useState(false);
  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  useEffect(() => {
    // console.log(searchtext.length);
    if (searchtext.length > 0) {
      fetch(`http://localhost:5000/search/${searchtext}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setusers(data);
          if (data.length > 0) {
            setresultfound(true);
          } else {
            setresultfound(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchtext]);

  return (
    <>
      <div className="container mt-3">
        <div className="w-25 m-auto ">
          {!resultfound && <p>no result found</p>}
          {resultfound && <Userslist users={users} />}
        </div>
      </div>
    </>
  );
}

export default SearchResult;
