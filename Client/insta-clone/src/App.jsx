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
  });
  const deleteUser = () => {
    setuser({
      loggedIn: false,
      userName: "Instagram_User",
      email: "example@gmail.com",
      token: "",
    });
    return true;
  };
  const setUser = (client) => {
    setuser({
      loggedIn: client.loggedIn,
      userName: client.userName,
      email: client.email,
      token: client.token,
    });
    return true;
  };

  const [token, settoken] = useLocalStorage("instaCloneToken", "");

  // useEffect(() => {
  //   if (!token === "") {
  //     fetch("http://localhost:5000/", {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // console.log(data.loggedin);
  //         if (data.loggedin) {
  //           setUser({
  //             loggedIn: data.loggedin,
  //             userName: data.userData.userName,
  //             email: data.userData.email,
  //             token: token,
  //           });
  //         }
  //       });
  //   }
  //   // console.log(token);
  // }, [token]);

  // useEffect(() => {
  //   if (user.token) {
  //     settoken(user.token);
  //   }
  //   if (user.loggedIn) {
  //     // console.log(user);
  //   }

  //   if (!user.loggedIn && token === "") {
  //     Navigate("/signin");
  //   }
  // }, [user.loggedIn, token]);

  return (
    <UserProvider value={{ user, deleteUser, setUser }}>
      <div className="row w-100">
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App;
