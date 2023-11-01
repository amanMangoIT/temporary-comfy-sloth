import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Get the authenticated user's information and store it in state
      setMyUser(user);
      } else {
        setMyUser(false);
        }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{loginWithRedirect, logout, myUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
