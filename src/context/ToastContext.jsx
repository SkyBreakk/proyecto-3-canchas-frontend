import React, { createContext, useState, useContext, useCallback } from "react";
import NotifToast from "../components/NotifToast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <NotifToast config={toast} setConfig={setToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
