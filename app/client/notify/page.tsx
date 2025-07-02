"use client"
import { getClientNotification } from "@/app/server/notification"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export default function Page() {
 const { data: session, status } = useSession();
 const sessionId = session?.user?.id;
 const { data: note } = useQuery({
  queryKey: ["note"],
  queryFn: async () => {
   if (status === "authenticated") {

    return await getClientNotification(sessionId as string)
   }
  }
 })
 return (
  <div className="w-full h-screen pl-5 flex flex-col gap-5">
   {note?.map((el, index) => (
    <Card key={index} className="flex flex-col gap-2 w-3/4 ">
     {el.type === "invitation" ? <span>{el.name} a {el.content}</span> :
      <div>

       {
        el.content !== "refuser votre contrat" ?
         <span>
          <b> {el.name}</b> a accepter votre contrat
          <div className="flex flex-row"></div>
          <Button>fixer un rendez-vous</Button>
         </span>
         :
         <span className="text-green-500">
          <b>{el.name}</b> a refuser votre contrat
          <div className="flex flex-row"></div>
         </span>

       }
      </div>

     }
     <span> {el.TimeToReceive !== null ? new Date(el.TimeToReceive).toLocaleTimeString() : null}</span>
    </Card>

   ))}
  </div>
 )
}