import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
function App() {
  const Navigate = useNavigate();
  const [user, setuser] = useState({
    loggedIn: false,
    userName: "Instagram_User",
    email: "example@gmail.com",
    token: "",
    followers: [],
    following: [],
    pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });
  const deleteUser = () => {
    setuser({
      loggedIn: false,
      userName: "Instagram_User",
      email: "example@gmail.com",
      token: "",
      followers: [],
      following: [],
      pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    });
    return true;
  };
  const setUser = (client) => {
    setuser({
      loggedIn: client.loggedIn,
      userName: client.userName,
      email: client.email,
      token: client.token,
      pfp: client.pfp,
      followers: client.followers,
      follwing: client.following,
    });
    return true;
  };

  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  useEffect(() => {
    if (token) {
      // console.log("hello");
      fetch("http://localhost:5000/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.loggedin) {
            setUser({
              loggedIn: data.loggedin,
              userName: data.userData.userName,
              email: data.userData.email,
              token: token,
              pfp: data.userData.pfp,
            });
          }
        });
    }
    // console.log(token);
  }, [token]);

  useEffect(() => {
    console.log();
    if (user.token) {
      settoken(user.token);
      // console.log(token);
    }
    if (!user.loggedIn && token === "") {
      Navigate("/signin");
    }
  }, [user.loggedIn, token]);

  return (
    <UserProvider value={{ user, deleteUser, setUser }}>
      <div className="row w-100">
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App;
