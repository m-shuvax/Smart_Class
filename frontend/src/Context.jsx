
import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

const useLocalStorage = (key, initialValue) => {
  // Retrieve value from localStorage
  const storedValue = JSON.parse(localStorage.getItem(key));
  const [value, setValue] = useState(storedValue || initialValue);

  useEffect(() => {
    // Store value in localStorage whenever it changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}


export const AppProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user',null);
  const [classId, setClassId] = useLocalStorage('classId','665d7a1e65de6ed8c1b44b6c');
  const [studentsList, setStudentsList] = useLocalStorage('studentList',[])
  const [className, setClassName] = useLocalStorage('className','Math4Algo')
  const [chats, setChats] = useLocalStorage('chats',[])
  

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        studentsList,
        setStudentsList,
        classId,
        setClassId,
        className,
        setClassName,
        chats,
        setChats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};