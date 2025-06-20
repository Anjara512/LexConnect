"use client"
import { deleteFriend, getFriendLawyer } from "@/app/server/community"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { IoBag } from 'react-icons/io5'



export default function Page() {
 const { data: session } = useSession()
 const sessionId = session?.user?.id;

 const { isPending, error, data } = useQuery({
  queryKey: ["frien"],
  queryFn: async () => {

   return getFriendLawyer(String(sessionId))
  }
 });





 const mutation = useMutation({
  mutationFn: async (id: string) => {
   try {
    const response = await deleteFriend(id);
    if (response) {
     alert(response)
    }
   } catch (error) {
    console.error(error, 'error lors de la rêquete');
   }
  }
 })


 const removeFriend = (id: string) => {
  mutation.mutate(id);

 }


 if (isPending) {
  return (
   <div className="flex flex-col gap-3 w-full">
    <Skeleton className="w-3/4 h-20 rounded-md"></Skeleton>
    <Skeleton className="w-3/4 h-20 rounded-md"></Skeleton>
    <Skeleton className="w-3/4 h-20 rounded-md"></Skeleton>
   </div>
  )
 }

 if (error) console.error(error);
 return (
  <div className="flex flex-col gap-3 w-full">
   {data !== "zero" ?
    data?.map((el, index) => (
     <Card className="w-3/4" key={index}>

      {el.name}



      <AlertDialog>
       <AlertDialogTrigger className="cursor-pointer flex flex-row gap-1  ">
        <Button>
         <IoBag />

         retirer

        </Button>
       </AlertDialogTrigger>
       <AlertDialogContent>
        <AlertDialogHeader>
         <AlertDialogTitle>
          voues êtes sur de vouloir retirer{
           el.name
          }
         </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
         <AlertDialogAction
          onClick={() => removeFriend(el.id)}

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

     </Card>

    )) : null


   }

  </div>
 )
}