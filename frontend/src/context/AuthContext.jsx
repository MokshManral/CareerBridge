import { createContext, useContext, useState } from "react";
import { clearAccessToken, setAccessToken } from "../api/token";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setAccessToken(token);
    setUser(userData);
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}