import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { AUTHTOKENS } from "utils/constants";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [user, setUser] = useState(() =>
    localStorage.getItem(AUTHTOKENS)
      ? jwt_decode(localStorage.getItem(AUTHTOKENS))
      : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem(AUTHTOKENS)
      ? JSON.parse(localStorage.getItem(AUTHTOKENS))
      : null
  );

  const logOutUser = async () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem(AUTHTOKENS);
  };


  return (
    <AuthContext.Provider
      value={{ authTokens, setAuthTokens, user, setUser, logOutUser, isSignInOpen, setIsSignInOpen }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
