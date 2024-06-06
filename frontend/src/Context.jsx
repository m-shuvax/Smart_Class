import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [classId, setClassId] = useState('665d7a1e65de6ed8c1b44b6c');
  const [lastPage, setLastPage] = useState(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        classId,
        setClassId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
