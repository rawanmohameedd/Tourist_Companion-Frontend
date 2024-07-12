// AlertContext.js
import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', visible: false });

  const showAlert = (message) => {
    setAlert({ message, visible: true });
  };

  const hideAlert = () => {
    setAlert({ message: '', visible: false });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
