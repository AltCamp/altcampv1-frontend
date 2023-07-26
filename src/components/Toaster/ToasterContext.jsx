/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import Toaster from './Toaster';

export const ToasterContext = createContext();

export const ToasterContextProvider = ({ children }) => {
  const [state, setState] = useState({
    show: false,
    title: '',
    text: '',
    type: 'info',
  });

  const setToast = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <ToasterContext.Provider value={{ state, setToast }}>
      {children}
      <Toaster {...state} />
    </ToasterContext.Provider>
  );
};
