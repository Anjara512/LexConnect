"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react";


function MakeQueryClient() {
 return new QueryClient()
};

let browserClient: QueryClient | undefined = undefined;


function getQueryClient() {
 if (typeof window === "undefined") {
  return MakeQueryClient()
 }
 else {
  if (!browserClient) browserClient = MakeQueryClient();
  return browserClient;
 }
}

export function Provider({ children }: { children: React.ReactNode }) {
 const queryclient = getQueryClient();

 return (
  <QueryClientProvider client={queryclient}>
   {children}
  </QueryClientProvider>
 )
}