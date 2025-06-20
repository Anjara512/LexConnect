"use client"

import { getFriendClient } from "@/app/server/community";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"


export default function Page() {

 const { data: session } = useSession();
 const sessionId = session?.user?.id;
 const { isPending, error, data } = useQuery({
  queryKey: ["none"],
  queryFn: async () => {
   if (!sessionId) throw new Error("erreur ")
   return getFriendClient(String(sessionId))
  }
 });
 if (isPending) {
  return (
   <div>loading...</div>
  )
 };
 if (error
 ) {
  return <span>error</span>
 }
 return (
  <div className="flex flex-col gap-3 w-full ">
   {
    data?.map((el) => (
     <Card
      className="w-3/4"
      key={el.key}>{el.name}

     </Card>
    ))


   }

  </div>
 )
}