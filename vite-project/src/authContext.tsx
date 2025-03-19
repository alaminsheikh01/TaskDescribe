import React, { createContext, useContext, useState, useEffect } from "react";

// Define the type for authentication context
type AuthContextType = {
  isAuthenticated: boolean;
  currentUser: any;
  login: (user: any) => void;
  logout: () => void;
};
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuthStatus = localStorage.getItem("isAuth");

    if (storedAuthStatus === "true" && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);

    // Store data in localStorage
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);

    // Clear data from localStorage
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
