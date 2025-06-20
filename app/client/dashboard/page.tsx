"use client";

import { getAllLawyer } from "@/app/server/getClientInfo";
// import { addNotification } from "@/app/server/serverMutation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {

  useQuery,
} from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { Suspense, } from "react";
// import { useSession } from "next-auth/react";



export default function Page() {

  const route = useRouter();

  const { theme } = useTheme();

  const { isPending, error, data } = useQuery({
    queryKey: ["lawyer"],
    queryFn: async () => {
      return await getAllLawyer()
    },
  });



  const viewProfile = (id: string) => {
    route.push(`/client/dashboard/profile/${id}`);
  };



  if (error) {
    return "error";
  }

  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Skeleton

          className={cn(
            "flex flex-col gap-2 w-1/2 p-3  rounded-md border boder-none shadow-white shadow-md",
            {
              "bg-gray-100": theme !== "dark",
            }
          )}></Skeleton>
        <Skeleton

          className={cn(
            "flex flex-col gap-2 w-1/2 p-3  rounded-md border boder-none shadow-white shadow-md",
            {
              "bg-gray-100": theme !== "dark",
            }
          )}></Skeleton>
      </div>
    )


  }




  return (
    <Suspense fallback={<Skeleton></Skeleton>}>

      <div className="flex flex-col   w-full">
        <div>
          <Input

            onClick={() => route.push('/client/searchPage')}
            type="search"
            className={cn("bg-zinc-200 w-1/2 ml-10", {
              "bg-zinc-800": theme === "dark",
            })}
            placeholder="chercher un avocat"
          />
        </div>
        <ul className="grid grid-cols-2 gap-1 mt-2 ml-6    ">
          {data?.map((el) => (
            <motion.li
              className={cn(
                "flex flex-col gap-2 w-1/2 p-3  rounded-md border boder-none shadow-white shadow-md",
                {
                  "bg-gray-100": theme !== "dark",
                }
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={el.id}
            >
              <div className="uppercase font-bold  text-lg ">{el.name}</div>

              <span>
                {el.name} est un avocat specialisé dans le domaine du
                {el.specialité}
                prêts a vous donneer ses services
              </span>
              <div className="flex flex-row gap-1 ">
                <Button
                  className="bg-blue-600 flex flerow gap-0.5 "
                  onClick={() => viewProfile(String(el.id))}
                >
                  voir le profil
                </Button>
              </div>

              <span className=" flex flex-row gap-1">
                <MapPin size={10} className="mt-2" />
                <p className="capitalize">{el.localisation}</p>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
