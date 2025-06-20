"use client";

import { cn } from "@/lib/utils";
import {
  Calendar,
  Delete,
  FileQuestion,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Settings,

  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { signOut, useSession } from "next-auth/react";
import {

  useQuery,
} from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { Command, CommandGroup, CommandSeparator, CommandItem } from "./ui/command";
import { getConnectedUser } from "@/app/server/getClientInfo";



const Nav = () => {
  const [isOpen, setisOpen] = useState(false);
  const toggleMenu = () => {
    setisOpen(isOpen === true ? false : true);
  };
  const { theme } = useTheme();
  function LougOutConnexion() {
    signOut();
    window.location.href = "/";
  }
  const { data: session } = useSession();

  const { isPending, data } = useQuery({
    queryKey: ["node"],
    queryFn: async () => {

      return await getConnectedUser(String(session?.user?.id))

    }

  });
  if (isPending) {
    return (
      <span className="h-screen">
        <Skeleton className="h-screen w-40"></Skeleton>
      </span>
    );
  }
  return (
    <div
      className={cn(
        "flex flex-row justify-between  bg-slate-950  md:h-screen md:w-40  w-max h-max   rounded-lg shaddow-lg ",
        { "w-40": isOpen === false },
        { "bg-zinc-100": theme !== "dark" }
      )}
    >
      <nav
        className={cn("hidden md:flex md:flex-col md:gap-10 md:h-screen  ", {
          "flex flex-col gap-10 h-screen": isOpen === false,
        })}
      >
        <div className="flex flex-row gap-2">
          <span>
            <User size={50}></User>
          </span>
          <span className="texsm font-medium">{data}</span>
        </div>
        <Link className="flex flex-row gap-2 " href={"/client/dashboard"}>
          <Home />
          Home
        </Link>

        <Link className="flex flex-row gap-2 " href={"/home"}>
          <Calendar />
          Programme
        </Link>
        <Link className="flex flex-row gap-2 " href={"/home"}>
          <FileQuestion />
          Aide
        </Link>
        <Link className="flex flex-row gap-2 " href={"/client/msgcl"}>
          <MessageCircle />
          Message
        </Link>
        <AlertDialog>
          <AlertDialogTrigger className="cursor-pointer flex flex-row gap-1  ">
            <LogOut />
            deconnexion
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                vous voulez vraiment vous deconnecter?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={LougOutConnexion}
                className="w-max h-max p-2 rounded-md bg-red-500 cursor-pointer text-white text-sm font-medium hover:ring-2 ring-blue-500 px-4 py-2"
              >
                oui
              </AlertDialogAction>
              <AlertDialogCancel className="w-max h-max p-2 rounded-md bg-green-500 cursor-pointer text-white text-sm font-medium hover:ring-2 ring-blue-500 px-4 py-2">
                non
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex flex-row gap-2 " >
          <Settings />
          <AlertDialog  >
            <AlertDialogTrigger className="flex flex-row justify-evenly">
              parametre
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full">
              <AlertDialogCancel>

                x
              </AlertDialogCancel>
              <AlertDialogTitle className="flex flex-row">
                <Settings />
                parametre

              </AlertDialogTitle>
              <div className=" bg-green-500 rounded-md  ">
                <Command>
                  <CommandGroup>
                    <CommandItem>langage</CommandItem>
                    <CommandSeparator></CommandSeparator>
                    <CommandItem>profile</CommandItem>
                    <CommandSeparator></CommandSeparator>

                    <CommandItem>general</CommandItem>
                  </CommandGroup>
                </Command>
              </div>

            </AlertDialogContent>
          </AlertDialog>
        </div>
      </nav>
      <div>
        {isOpen ? (
          <Menu
            onClick={toggleMenu}
            className=" cursor-pointer flex md:hidden sm:hidden "
          />
        ) : (
          <Delete
            onClick={toggleMenu}
            className=" cursor-pointer flex md:hidden sm:hidden "
          />
        )}
      </div>
    </div>
  );
};

export default Nav;
