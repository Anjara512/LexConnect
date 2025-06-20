"use client"
import { getClientNotification } from "@/app/server/notification"
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
     <span>{el.name} a {el.content}</span>
     <span> {el.TimeToReceive !== null ? new Date(el.TimeToReceive).toLocaleTimeString() : null}</span>
    </Card>

   ))}
  </div>
 )
}