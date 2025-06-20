"use client";

import { createContext, useContext } from "react";
import { Lawyer } from "../types/type";

const lawyercontext = createContext<Lawyer | null>(null);

export const LawyerProvider = ({ children }: { children: React.ReactNode }) => {
  const Lawyer: Lawyer | null = null;
  return (
    <lawyercontext.Provider value={Lawyer}>{children}</lawyercontext.Provider>
  );
};

export const useLawyer = () => {
  if (!lawyercontext) throw new Error("le contexte est null a chier");
  return useContext(lawyercontext);
};
