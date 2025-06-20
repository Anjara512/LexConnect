"use client";

import { Button } from "@/components/ui/button";
import { Card, } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "lucide-react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteNotifs, getNotification } from "../../../server/notification";
import { MyFriend } from "@/app/server/community";
import { Skeleton } from "@/components/ui/skeleton";
import { toast, Toaster } from "sonner"
import Link from "next/link";




export default function Page() {

  const { data: session } = useSession();

  const sessionId = session?.user?.id;
  const [buttonValue, setButtonValue] = useState('Accepter')





  const { isPending, error, data } = useQuery({
    queryKey: ["noobe"],
    queryFn: async () => {

      return await getNotification(String(sessionId))
    }
  });




  const queryclient = useQueryClient()


  const route = useRouter();
  const { mutate } = useMutation({
    mutationFn: async (id: { identif: string, el: string }) => {

      return await MyFriend(String(sessionId), id);
    },
    onSuccess: (data) => {
      queryclient.invalidateQueries({ queryKey: ['noobe'] });
      setButtonValue("Amis");
      toast.success(data);
    }
    ,
    onError: () => {
      toast.warning("une erreu s'est produit");

    }
  });



  const theFriend = (id: string, el: string) => {
    const props = { identif: id, el: el }
    mutate(props);
  }

  const deleteNote = useMutation({
    mutationFn: async (props: { id: string, key: string }) => {
      return await deleteNotifs(props, sessionId as string);

    },
    onSuccess: (data) => {
      toast.success(data);

    },
    onError: () => {
      toast.warning('suppresssion no efffectué');
    }
  })

  const deleteNotif = (id: string, key: string) => {
    const props = { id: id, key: key }
    deleteNote.mutate(props);
  }

  if (isPending) {
    return (
      <div>
        <Skeleton className="w-3/4 h-10 rounded-md"></Skeleton>
        <Skeleton className="w-3/4 h-10 rounded-md"></Skeleton>
        <Skeleton className="w-3/4 h-10 rounded-md"></Skeleton>
      </div>
    )
  }
  if (error) {
    return <span>error</span>
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Toaster />
      <div >
        <Button className="sticky w-max h-max" onClick={() => route.back()}>
          back
        </Button>
      </div>
      <ul className="flex flex-col gap-2 ">
        {data?.map((el,) => (
          <li

            className={cn(
              "w-full flex flex-row justify-between gap-8 rounded-md ",

            )}
            key={el.id}
          >
            <Card className="w-3/4 flex- flex-col p-4 gap-4">
              <div className="flex flex-row  gap-2">
                <User
                  size={100}
                  className="rounded-full border-1 border-white p-2 "
                />
                <div className="flex flex-col">
                  {el.type === "invitaion" ?

                    <span>

                      {el.name} veux rejoindre votre communauté
                    </span>



                    :
                    <span>

                      {el.name}vous a envoyer une contrat
                    </span>}
                  <span>
                    {new Date(String(el.TimeToReceive)).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {
                el.type === "invitation" ? <div className="flex flex-row gap-2">
                  <Button className="bg-green-500" onClick={() => theFriend(String(el.key), String(el.id))} >
                    {buttonValue}
                  </Button>
                  <Button className="bg-red-500" onClick={() => deleteNotif(el.id as string, el.key as string)} >

                    {deleteNote.isPending ? "..." : "decline"}
                  </Button>
                </div> :
                  <div className="flex flex-row gap-2">
                    <Button variant={'default'} asChild>
                      <Link href='/lawyer/dashboard/contrat'>
                        voir le contart
                      </Link>

                    </Button>
                  </div>
              }
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
