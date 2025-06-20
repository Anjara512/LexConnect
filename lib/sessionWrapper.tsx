"use client";


import { SessionProvider } from "next-auth/react";

export const Sessionwrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider  >{children}</SessionProvider>;
};
