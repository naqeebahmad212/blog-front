import { createContext, useState } from "react";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUSerInfo] = useState({});
  return (
    <UserContext.Provider value={{ useState, setUSerInfo }}>
      {children}
    </UserContext.Provider>
  );
}
