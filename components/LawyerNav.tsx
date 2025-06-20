"use client";

import { cn } from "@/lib/utils";
import { Bell, Calendar, Delete, Home, LogOut, Menu, MessageCircle, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { useQuery } from "@tanstack/react-query";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { getUserName } from "@/app/server/getLawyerInfo";
import { Command, CommandGroup, CommandSeparator, CommandItem } from "./ui/command";




const LawyerNav = () => {
  const { data: session } = useSession();


  const { data } = useQuery({
    queryKey: ["joker"],
    queryFn: async () => await getUserName(String(session?.user?.id))
  })


  const { theme } = useTheme();
  const [isOpen, setisOpen] = useState(false);
  const toggleMenu = () => {
    setisOpen(isOpen === true ? false : true);
  };
  // const router = useRouter();
  const LougOutConnexion = () => {
    signOut();
    window.location.href = "/";
  };

  return (
    <div
      className={cn(
        "flex flex-row justify-between z-20    md:h-screen md:w-40  w-max h-max  bg-stone-950 rounded-lg shaddow-lg ",
        {
          "bg-zinc-100": theme !== "dark",
        },
        { "w-40": isOpen === false },
      )}
    >
      <nav
        className={cn("hidden  md:flex md:flex-col fixed  md:h-screen  ", {
          "flex flex-col  h-screen": isOpen === false,
        })}
      >
        <Command
          className="flex flex-col gap-10"
        >
          <CommandGroup>

            <CommandItem>

              <Link href='/lawyer/dashboard/myProfile' >
                {data?.name}
              </Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator></CommandSeparator>


          <CommandGroup >
            <CommandItem>

              <Link className="flex flex-row gap-2 " href={"/lawyer/dashboard"}>
                <Home />
                Home
              </Link>
            </CommandItem>
            <CommandSeparator>
            </CommandSeparator>
            <CommandItem>
              <Link
                className="flex flex-row gap-2 "
                href={"/lawyer/dashboard/programme"}
              >
                <Calendar />
                Programme
              </Link>
            </CommandItem>
            <CommandSeparator></CommandSeparator>

            <CommandItem> <Link
              className="flex flex-row gap-2 "
              href={"/lawyer/dashboard/msg"}
            >

              <MessageCircle />
              Message

            </Link></CommandItem>

            <CommandSeparator> </CommandSeparator>
            <CommandItem>
              <Link className="flex flex-row gap-2 " href={"/"}>
                <Home />
                contrat
              </Link>
            </CommandItem>
            <CommandSeparator />
            <CommandItem>
              <Link
                className="flex flex-row gap-2 "
                href={"/lawyer/dashboard/notification"}
              >
                <Bell />
                Notification
                <span className="text-zinc-100 bg-red-500 rounded-full "></span>
              </Link>
            </CommandItem>
            <CommandSeparator />
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item1">
                  <AccordionTrigger className="flex flex-row gap-2">
                    <Settings />
                    parametres
                  </AccordionTrigger>
                  <AccordionContent>
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

                    <Link href={"/"}
                      className="flex flex-row gap-2 ">
                      <User>

                      </User>
                      profile
                    </Link>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
          </CommandGroup>
        </Command>







      </nav>
      <div className="fixed ">
        {isOpen ? (
          <Menu
            onClick={toggleMenu}
            className=" cursor-pointer flex md:hidden sm:hidden "
          />
        ) : (
          <Delete
            onClick={toggleMenu}
            className=" cursor-pointer ml-30 flex md:hidden sm:hidden "
          />
        )}
      </div>
    </div>
  );
};

export default LawyerNav;
