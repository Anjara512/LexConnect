"use client"
import { getOneLawyer } from "@/app/server/getLawyerInfo";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";


export default function Page() {
 const { data: session, status } = useSession();
 const sessionId = session?.user?.id;
 const { data: me } = useQuery({
  queryKey: ['me'],
  queryFn: async () => {
   if (status) {
    return await getOneLawyer(sessionId as string)
   }
  }
 });


 return (
  <div className="flex flex-col gap-4 h-screen w-full ">

   <Card className="w-1/2 pl-8 ml-8">
    <CardTitle>Name</CardTitle>
    <span className="flex flex-row w-full justify-evenly">
     {me?.name}
     <Button>modifier</Button>

    </span>

   </Card>
   <Card className="w-max flex flex-row ml-8 ">
    <CardTitle>star</CardTitle>
    <Star className="text-yellow-600 font-bold"></Star>


    <Star></Star>
   </Card>
  </div>
 )
}