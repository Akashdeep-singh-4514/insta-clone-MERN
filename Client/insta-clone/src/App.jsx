import { Outlet } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { useState } from "react";
function App() {
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

  return (
    <UserProvider value={{ user, deleteUser, setUser }}>
      <div className="row w-100">
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App;
