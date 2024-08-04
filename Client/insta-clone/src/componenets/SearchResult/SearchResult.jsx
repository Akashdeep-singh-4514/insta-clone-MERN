import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Userslist from "./Userslist";

function SearchResult() {
  const { searchtext } = useParams();
  const [users, setUsers] = useState([]);
  const [resultFound, setResultFound] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading
  const [token] = useLocalStorage("instaCloneToken", "");

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchtext.length > 0) {
        setLoading(true); // Start loading

        try {
          const response = await fetch(
            `https://insta-clone-mern-bakend.onrender.com/search/${searchtext}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`);
          }
          const data = await response.json();
          setUsers(data);
          setResultFound(data.length > 0);
        } catch (err) {
          console.error("Error fetching users:", err);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        setUsers([]);
        setResultFound(false);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchtext, token]);

  return (
    <div className="container mt-3">
      <div className="w-25 m-auto">
        {loading && <p>Loading...</p>} {/* Display loading text */}
        {!loading && !resultFound && <p>No results found</p>}
        {!loading && resultFound && <Userslist users={users} />}
      </div>
    </div>
  );
}

export default SearchResult;
