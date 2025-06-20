"use client";
import { createContext, useContext } from "react";

interface UserClient {
  email: string;
  password: string;
}
const userContext = createContext<UserClient | null>(null);

const User = {
  email: "",
  password: " ",
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return <userContext.Provider value={User}>{children}</userContext.Provider>;
};

export const useUser = () => {
  if (userContext === null) {
    throw new Error("le context est null");
  }
  return useContext(userContext);
};
