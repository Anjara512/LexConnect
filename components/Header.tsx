"use client";


import { getActiveId } from "@/app/server/getLawyerInfo";
import { useQuery } from "@tanstack/react-query";
import { Moon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaUser } from "react-icons/fa6"
import { Bell } from 'lucide-react'
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const toogleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { data: session, status } = useSession();
  const sessionId = session?.user?.id;

  const { data: id } = useQuery({
    queryKey: ['id', sessionId],
    queryFn: async () => {
      if (status === 'authenticated') {
        return await getActiveId(sessionId as string);
      }
    }
  })

  return (
    <header className={cn("flex fex-col bg-zinc-950   z-30 top-0 sticky  justify-between w-full "
    )}>
      <h1 className="w-max font-medium flex flex-row  gap-2  md:text-2xl text-lg  h-max bg-gradient-to-l from-cyan-500 to-purple-500 bg-clip-text text-transparent uppercase">
        <Image src={"/logo-transparent.png"} alt="logo" width={40} height={40} />
        Lex Context
      </h1>
      <div className="flex flex-row gap-2  ">
        {id ?
          (<div className="flex flex-row gap-2 ">
            {id === "client" ?
              <div>

                <Link href="/client/friend" className="flex flex-row gap-2">

                  <FaUser></FaUser>
                  com


                </Link>
                <Link href={"/client/notify"}>
                  <Bell />
                </Link>
              </div>
              :
              <Link className="flex lfex-row gap-1" href="/lawyer/dashboard/friend">
                <FaUser></FaUser>
                com
              </Link>

            }
          </div>) : null}

        <Moon className="cursor-pointer " onClick={toogleTheme}></Moon>
      </div>
    </header>
  );
}
