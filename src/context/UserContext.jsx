import { createContext, useEffect, useState } from "react";
import { LogOut } from "../helpers/auth";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const response = await fetch("http://localhost:4500/api/auth/profile", {
        credentials: "include",
      });
      if (response.ok) {
        const { data } = await response.json();
        setUser({
          username: data.username,
          email: data.email,
          role: data.role,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al cargar datos de usuario:", error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const clearUserData = () => {
    setUser(null);
    LogOut();
  };

  return (
    <UserContext.Provider
      value={{ user, authLoading, loadUserData, clearUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
