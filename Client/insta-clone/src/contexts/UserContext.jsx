import { createContext, useContext } from "react";

const UserContext = createContext({
  user: {
    loggedIn: false,
    userName: "Instagram_User",
    email: "example@gmail.com",
    token: "",
    _id: "",
    pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  setUser: () => {},
  deleteUser: () => {},
});

const useUser = () => {
  return useContext(UserContext);
};
const UserProvider = UserContext.Provider;
export { UserContext, useUser, UserProvider };
