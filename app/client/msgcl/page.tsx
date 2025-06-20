"use client"
import { Friend } from "@/app/lawyer/dashboard/msg/page";
import { getFriendClient } from "@/app/server/community";
import { getId } from "@/app/server/getLawyerInfo";
import { getMessage, sendMessageToLawyer } from "@/app/server/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Command, CommandGroup, CommandInput, CommandItem, CommandSeparator } from "@/components/ui/command";
import { MessageCircleCode } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


export const MsgSchema = z.object({
  message: z.string(),

})

export type MessageFormValue = z.infer<typeof MsgSchema>;




export default function Page() {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const [currentId, setcurrentId] = useState<Friend>();
  const [activeId, setactiveId] = useState('');

  useEffect(() => {
    const getAuthId = async () => {
      const Theid = await getId(String(sessionId));
      setactiveId(Theid as string);

    }
    getAuthId()

  });



  const { data: friend } = useQuery({
    queryKey: ["friend"],
    queryFn: async () => {
      return await getFriendClient(sessionId as string)
    }
  })
  // 
  const client = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: ["dear", currentId?.key],
    queryFn: async () => {


      return await getMessage(sessionId as string, currentId?.key as string)
    }
  });

  const getCurrent = (el: Friend) => {
    setcurrentId(el);

  }

  const { register, handleSubmit, reset } = useForm<MessageFormValue>(
    {
      resolver: zodResolver(MsgSchema)
    }
  );
  const mutation = useMutation({
    mutationFn: async (data: MessageFormValue) => {

      return await sendMessageToLawyer(data, currentId?.key as string, String(sessionId))

    },
    onSuccess: (data => {
      toast.success(data);
      client.invalidateQueries({ queryKey: ['dear'] });

    }),
    onError: () => {
      toast.warning("non envoyé");
    }
  })


  const onsubmit = (data: MessageFormValue) => {
    mutation.mutate(data)
    reset()


  }
  if (isPending) {
    return (
      <div className="flex flex-row gap-5 w-full items-center justify-center h-screen">
        <Skeleton className="w-42 h-3/4 rounded-md">

        </Skeleton>
        <Skeleton className="w-3/4 h-3/4 rounded-md">

        </Skeleton>
      </div>
    )
  }
  return (
    <div className="flex flex-row gap-5 h-screen w-full items-center justify-center ">
      {/* <div className="w-42 rounded-md  bg-stone-900 h-3/4"> */}

      <Command className="w-50 h-3/4 shadow-lg">
        <CommandInput placeholder="search...." />
        <CommandGroup>

          {friend?.map((el, index) => (
            <div onClick={() => getCurrent(el)} key={index}>
              <CommandItem>
                {el.name}

              </CommandItem>


              <CommandSeparator />
            </div>
          ))}
        </CommandGroup>

      </Command>
      {/* </div> */}
      <div className={cn("flex  flex-col gap-4 h-3/4 p-4 w-3/4 rounded-md bg-neutral-900  ", {
        "bg-zinc-100": theme !== "dark"
      })}>
        <h1 className="flex flex-row gap-2 font-medium text-sm ">
          <MessageCircleCode />
          Message
        </h1>
        <span className=" flex flex-row">
          {currentId?.name}
          <Button variant={"default"} asChild>
            <Link href={'/client/contrat'}>Etablir un contrat</Link>

          </Button>
        </span>

        <div className={cn("bg-stone-900 w-full flex flex-col gap-2 overflow-x-scroll  h-80 rounded-md", {
          "bg-slate-200": theme !== "dark"
        })}>
          {currentId ? (data?.map((el, index) => (


            <span className={cn("w-full ", {

            })} key={index}>
              <span className={cn('w-max flex flex-col  bg-red-500 rounded-md p-2 ', {
                "bg-blue-500 float-right ": el.key !== activeId
              })}>
                {el.contenu}
                <span className="block text-sm/2">
                  {new Date(el.date).toLocaleTimeString()}
                </span>

              </span>
            </span>

          ))) : <span className="text-2xl sm:4xl md:6xl capitalize bg-gradient-to-l mx-30 my-30 from-red-800 to-cyan-500 bg-clip-text text-transparent">
            hello 🖐,whats up
          </span>}
        </div>
        <div className="flex flex-col  ">
          <form onSubmit={handleSubmit(onsubmit)} className="flex flex-row gap-2">
            <Input {...register('message')} ></Input>
            <Button>Envoyer</Button>
          </form>

        </div>


      </div>
    </div>
  )
}


