import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const server = "http://localhost:3001";

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
