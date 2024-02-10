import React, { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useLocalStorage from "use-local-storage";
export default function ButtonsforLoggedin() {
  const { user, deleteUser } = useUser();
  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  const handleLogout = () => {
    settoken("");
    deleteUser();
  };
  useEffect(() => {
    console.log(user);
    console.log(token);
  }, [user, token]);

  return (
    <>
      <div className="w-25">
        <input
          type="text"
          name="search"
          id="search"
          className="mb-3  p-1 w-100 rounded-2 "
          placeholder="search"
          width=""
        />
      </div>
      <div className="w-25 nav start " style={{ marginLeft: "10%" }}>
        <ul className="list-unstyled nav nav-item  ">
          <li className="nav-item mx-2 p-1">🏠</li>
          <li className="nav-item mx-2 p-1">🏠</li>
          <li className="nav-item mx-2 p-1">🏠</li>
          <li className="nav-item mx-2 p-1">🏠</li>
          <li className="nav-item mx-2 p-1">🏠</li>
          <li className="nav-item mx-2 p-1">🏠</li>
        </ul>
        <div className=" nav-item mx-3 ">
          <span
            className="btn p-2 bg-info-subtle rounded-2  "
            onClick={() => {
              handleLogout();
            }}
          >
            logout
          </span>
        </div>
      </div>
    </>
  );
}
