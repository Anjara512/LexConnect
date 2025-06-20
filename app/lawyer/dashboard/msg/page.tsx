"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircleCode } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { getFriendLawyer } from "@/app/server/community";
import { getMessage, sendMessageToClient, } from "@/app/server/messages";
import { toast, Toaster } from "sonner";
import { MessageFormValue, MsgSchema } from "@/app/client/msgcl/page";
import { getId } from "@/app/server/getLawyerInfo";
import { Command, CommandGroup, CommandInput, CommandItem, CommandSeparator } from "@/components/ui/command";




export interface Friend {
  id: string
  userId: string
  name: string
  nbrDeContrat: string
  key: string
}


export interface Msg {
  id: string;
  userId: string;
  name: string;
  contenu: string;
  date: Date;
  key: string | null;
}





export default function Page() {
  const { theme } = useTheme();
  const { data: session } = useSession();


  const sessionId = session?.user?.id;
  const [activeId, setactiveId] = useState('')


  useEffect(() => {
    const getAuthId = async () => {
      const Theid = await getId(String(sessionId));
      setactiveId(Theid as string);

    }
    getAuthId()

  })



  const { data: friend } = useQuery({
    queryKey: ["fri"],
    queryFn: async () => {


      const res = await getFriendLawyer(String(sessionId));

      return res;

    },



  });

  const [currentChat, setcurrentChat] = useState<Friend>();








  const getCurrent = async (el: Friend) => {
    setcurrentChat(el);

  };





  const { data: mgs } = useQuery({
    queryKey: ["dear", currentChat?.id],
    queryFn: async () => {

      return await getMessage(String(sessionId), currentChat?.key as string);



    },

  });




  const { register, handleSubmit, reset } = useForm<MessageFormValue>({
    resolver: zodResolver(MsgSchema)
  });

  const queyrclient = useQueryClient();




  const mutation = useMutation({
    mutationFn: async (data: MessageFormValue) => {
      console.log(currentChat);
      return await sendMessageToClient({ data, currentChat: currentChat?.key as string, sessionId: sessionId as string })


    },
    onSuccess: (data) => {
      toast.success(data);
      queyrclient.invalidateQueries({ queryKey: ['dear'] })

    },
    onError: () => {
      toast.warning("message non envoyé");

    }
  })
  const onSubmit = (data: MessageFormValue) => {

    mutation.mutate(data);
    reset();

  }

  return (
    <div className="flex flex-row gap-5 h-screen w-full items-center justify-center ">
      <Toaster />
      <Command className="w-50 h-3/4 shadow-lg">
        <CommandInput placeholder="search...." />
        <CommandGroup>

          {friend !== "zero" ? friend?.map((el, index) => (
            <div onClick={() => getCurrent(el)} key={index}>
              <CommandItem>
                {el.name}

              </CommandItem>


              <CommandSeparator />
            </div>
          )) : (
            <span>
              <h1>aucunne amis</h1>
            </span>
          )}
        </CommandGroup>

      </Command>
      <div className={cn("flex  flex-col gap-4 h-3/4 p-4 w-3/4 rounded-md bg-neutral-900  ", {
        "bg-zinc-100": theme !== "dark"
      })}>
        <h1 className="flex flex-row gap-2 font-medium text-sm ">
          <MessageCircleCode />
          Message
        </h1>
        <span>
          {currentChat?.name}
        </span>
        <div className={cn("bg-slate-900 w-full flex flex-col gap-2 overflow-x-scroll  h-80 rounded-md", {
          "bg-slate-200": theme !== "dark"
        })}>
          {currentChat ? (mgs?.map((el, index) => (


            <span className={cn("w-full ", {

            })} key={index}>
              <span className={cn('w-max flex flex-col font-bold bg-red-500 rounded-md p-2 ', {
                "bg-blue-500 float-right ": el.key !== activeId
              })}>
                {el.contenu}
                <span className="block text-sm/2 font-medium">
                  {new Date(el.date).toLocaleTimeString()}
                </span>

              </span>
            </span>

          ))) : <span className="text-2xl sm:4xl md:6xl capitalize bg-gradient-to-l mx-30 my-30 from-red-800 to-cyan-500 bg-clip-text text-transparent">
            hello 🖐,whats up
          </span>}
        </div>
        <div className="flex flex-col  ">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-2">
            <Input {...register("message")} ></Input>
            <Button>Envoyer</Button>
          </form>

        </div>


      </div>
    </div>
  )
}


