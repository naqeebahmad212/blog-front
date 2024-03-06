import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const server = "https://blog-back-bzo6.vercel.app";

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
