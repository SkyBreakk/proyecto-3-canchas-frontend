import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  const loadUserData = async () => {
    try {
      const response = await fetch("http://localhost:4500/api/auth/profile", {
        credentials: "include", // para enviar cookies
      });
      if (response.ok) {
        const { data } = await response.json();
        setUser({
          username: data.username,
          email: data.email,
          role: data.role,
        });
      } else {
        setUser(null); // Si no se pudo cargar, se considera no autenticado
      }
    } catch (error) {
      console.error("Error al cargar datos de usuario:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const clearUserData = () => {
    setUser(null);
  };
  //funcion para cargar datos de usuario desde el backend

  return (
    <UserContext.Provider value={{ user, loadUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
