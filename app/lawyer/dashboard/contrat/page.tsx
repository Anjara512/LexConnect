"use client"
import { getContrate, RejectContrat, ResolveContrate } from '@/app/server/contrat';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react'
import { toast, Toaster } from 'sonner';

const Page = () => {

 const { data: session } = useSession();
 const sessionId = session?.user?.id;
 const contratQuery = useQuery({
  queryKey: ['contrat'],
  queryFn: async () => {
   return await getContrate(sessionId as string)
  }
 });

 const { mutate } = useMutation({
  mutationFn: async (el: string) => {
   return await ResolveContrate(sessionId as string, el as string)
  }, onSuccess: (data) => {
   toast.success(data)
  }
 })

 const resolved = (el: string) => {

  mutate(el)

 }
 const Rejeter = useMutation({
  mutationFn: async (el: string) => {
   return await RejectContrat(sessionId as string, el as string);

  },
  onSuccess: (data) => {
   toast.success(data);
  }

 })

 const Reject = (el: string) => {
  Rejeter.mutate(el)

 }
 return (
  <div className='flex flex-col ml-5 w-full  h-screen '>
   <Toaster />
   {contratQuery.data?.map((el, index) => (
    <Card className='w-3/4' key={index}>

     <CardTitle>{el.type}</CardTitle>
     <CardContent className='flex flex-col gap-2'>

      <span>
       {el.name} demande ce services

       {el.motif}</span>
      <span className='flex flex-row gap-2'>
       <Button onClick={() => resolved(el.key)}>Accepter</Button>
       <Button onClick={() => Reject(el.key)}>Rejeter</Button>

      </span>
     </CardContent>
     <CardFooter>{new Date(el?.date as Date).toLocaleString()}</CardFooter>





    </Card>


   ))}
  </div>
 )
}

export default Page;
