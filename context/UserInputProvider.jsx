"use client";
import { createContext, useContext, useState } from "react";

const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  const [userCourseInput, setUserCourseInput] = useState([]);

  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      {children}
    </UserInputContext.Provider>
  );
};

export const useUserInputContext = () => {
  const context = useContext(UserInputContext);

  if (context === undefined) {
    throw new Error("Use theme must be used within a ThemProvider");
  }

  return context;
};
