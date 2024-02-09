import { createContext, useContext } from "react";

const UserContext = createContext({
  user: {
    loggedIn: false,
    userName: "Instagram_User",
    email: "example@gmail.com",
    token: "",
  },
  setUser: () => {},
  deleteUser: () => {},
});

const useUser = () => {
  return useContext(UserContext);
};
const UserProvider = UserContext.Provider;
export { UserContext, useUser, UserProvider };
