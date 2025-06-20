"use server";


import prisma from "@/lib/db";



export const getOneLawyer = async (id: string) => {
  const cibledLawayer = await prisma.lawyer.findFirst({
    where: { id: id },
  });

  if (!cibledLawayer) {
    throw new Error("impossible d'obtenir les rsultat neccesare");
  }

  return cibledLawayer;
};


export const getUserName=async (id:string) => {
 const users=await prisma.user.findFirst({
  where:{id:id}
 });
 const cibledClient=await prisma.lawyer.findFirst({
  where:{userId:users?.id}
 });
 if(!cibledClient)throw new Error('utilisatuer introuvable');
 return cibledClient;
 
}

 export const getId=async (sessionId:string)=>{
   const user = await prisma.user.findFirst({
     where: { id: sessionId }
   });
   const lawyer = await prisma.lawyer.findFirst({
     where: { userId: user?.id }
   });
   const client=await prisma.client.findFirst({
    where:{userId:user?.id}
   })
   if(client){
    return client?.id;

   }
   if(lawyer){
     return lawyer?.id 

   }

  }

  export const getActiveId=async (sessionId:string)=>{
   const user = await prisma.user.findFirst({
     where: { id: sessionId }
   });
   const lawyer = await prisma.lawyer.findFirst({
     where: { userId: user?.id }
   });
   const client=await prisma.client.findFirst({
    where:{userId:user?.id}
   })
   if(client){
    return "client";

   }
   if(lawyer){
     return "lawyer"

   }

  }


  


   
    
  



