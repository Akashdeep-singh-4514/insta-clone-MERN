import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";

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
          {resultfound &&
            users.map((user) => {
              return (
                <Link
                  to={`/user/${user.userName}`}
                  key={user._id}
                  className="w-100 text-end text-decoration-none row "
                >
                  <div
                    style={{ width: "70px" }}
                    className="col-2 text-decoration-none  align-items-center  m-0"
                  >
                    <img
                      src={user.pfp}
                      alt=""
                      className=" rounded-circle w-100 justify-content-lg-start mt-2 "
                    />
                  </div>
                  <div className="col-9 justify-content-center align-items-center row text-start">
                    <p className="m-0 p-0 text-decoration-none  text-dark fw-medium">
                      {user.userName}
                    </p>
                    <p className="m-0 p-0 text-decoration-none  text-dark ">
                      {user.name}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SearchResult;
