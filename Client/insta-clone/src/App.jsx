import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { useEffect, useState, useMemo } from "react";
import useLocalStorage from "use-local-storage";

import {
  CreatePost,
  Explore,
  Followers,
  Following,
  Header,
  Home,
  OtherProfile,
  PostDetailsE,
  PostDetailsh,
  PostDetailsp,
  Profile,
  SearchResult,
  Signin,
  Signup,
} from "./componenets/index.js";

function App() {
  const [hasAccount, setHasAccount] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    loggedIn: false,
    userName: "Instagram_User",
    email: "example@gmail.com",
    token: "",
    _id: "",
    pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });
  const [token, setToken] = useLocalStorage("instaCloneToken", "");

  const deleteUser = () => {
    setUser({
      loggedIn: false,
      userName: "Instagram_User",
      email: "example@gmail.com",
      token: "",
      _id: "",
      pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    });
  };

  const handleSetUser = (client) => {
    setUser({
      loggedIn: client.loggedIn,
      userName: client.userName,
      email: client.email,
      token: client.token,
      pfp: client.pfp,
      _id: client._id,
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await fetch(
            "https://insta-clone-mern-bakend.onrender.com/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();

          if (data.loggedin) {
            handleSetUser({
              loggedIn: data.loggedin,
              userName: data.userData.userName,
              email: data.userData.email,
              token: token,
              pfp: data.userData.pfp,
              _id: data.userData._id,
            });
          } else {
            setToken("");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setToken(""); // Reset token on error
        }
      }
    };

    fetchUserData();
  }, [token, setToken]);

  useEffect(() => {
    if (user.token && user.token !== token) {
      setToken(user.token);
    }

    // Redirect to /signin only if the user is not logged in and not on the signup page
    if (!user.loggedIn && !token) {
      if (window.location.pathname !== "/signup") {
        navigate("/signin");
      }
    }
  }, [user.token, user.loggedIn, token, navigate]);

  const userProviderValue = useMemo(
    () => ({ user, deleteUser, setUser: handleSetUser }),
    [user]
  );

  return (
    <UserProvider value={userProviderValue}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user.loggedIn ? (
              <Home />
            ) : hasAccount ? (
              <Navigate to="/signin" />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/profile"
          element={user.loggedIn ? <Profile /> : <Navigate to="/signin" />}
        />
        <Route
          path="/createpost"
          element={user.loggedIn ? <CreatePost /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={
            user.loggedIn ? (
              <Navigate to="/" />
            ) : (
              <Signin hasAccount={hasAccount} setHasAccount={setHasAccount} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user.loggedIn ? (
              <Navigate to="/" />
            ) : (
              <Signup hasAccount={hasAccount} setHasAccount={setHasAccount} />
            )
          }
        />
        <Route
          path="/explore"
          element={user.loggedIn ? <Explore /> : <Navigate to="/signin" />}
        />
        <Route
          path="/allcomments/:postId"
          element={user.loggedIn ? <PostDetailsh /> : <Navigate to="/signin" />}
        />
        <Route
          path="/post/:postId"
          element={user.loggedIn ? <PostDetailsp /> : <Navigate to="/signin" />}
        />
        <Route
          path="/posts/:postId"
          element={user.loggedIn ? <PostDetailsE /> : <Navigate to="/signin" />}
        />
        <Route
          path="/user/:userName"
          element={user.loggedIn ? <OtherProfile /> : <Navigate to="/signin" />}
        />
        <Route
          path="/followers/:userName"
          element={user.loggedIn ? <Followers /> : <Navigate to="/signin" />}
        />
        <Route
          path="/following/:userName"
          element={user.loggedIn ? <Following /> : <Navigate to="/signin" />}
        />
        <Route
          path="/search/:searchtext"
          element={user.loggedIn ? <SearchResult /> : <Navigate to="/signin" />}
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
