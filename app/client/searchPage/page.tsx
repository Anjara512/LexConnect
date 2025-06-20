"use client"
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Page() {
 const { theme } = useTheme()
 const [searcher, setSearcher] = useState(" ");
 const getLawyerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearcher(e.target.value);

 }
 return (
  <div className="flex flex-col gap-2 w-full" >
   <Input
    onChange={getLawyerSearch}
    type="search"
    value={searcher}
    className={cn("bg-zinc-200 w-1/2 ml-10", {
     "bg-zinc-800": theme === "dark",
    })}
    placeholder="chercher un avocat"
   />
  </div>
 )
}