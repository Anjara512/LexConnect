"use server"

import prisma from "@/lib/db";


export async  function AddContrat(props:{motif:string,budget:number,type:string},id:string,sessionId:string){

 const comm=await prisma.client.findFirst({
  where:{userId:sessionId}
 });
 const cibledClient=await prisma.lawyer.findFirst({
  where:{id:id}
 });
 const date=new Date();

 const sendContrate=await prisma.contrat.create({
  data:{
   userId:cibledClient?.id as string ,
   comm:comm?.id as string ,
   motif:props.motif as string ,
   name:comm?.name as string ,
   key:comm?.id as string,
   date:date,
   budget:props.budget as number,
   type:props.type as string
  }
 });

 const noteContrate=await prisma.clientContrat.create({
   data:{
   userId:comm?.id as string ,
   comm:cibledClient?.id as string ,
   motif:props.motif as string ,
   date:date,
   name:cibledClient?.name as string,
key:cibledClient?.id as string,
   budget:props.budget as number,
   type:props.type as string
  }

 });

 const sendNotification=await prisma.notification.create({
  data :{
     content:"envoyer une cotrats",
      type:"contrat",
      key:comm?.id,
      vue:false,
      userId:cibledClient?.id as string,
      name:comm?.name as string
  },

  

 });
 if(!sendNotification||!sendContrate||!noteContrate){
  return "impossible d'etablir le contact ";
 }
 return 'contrat envoyer avec succes';
}

export async  function getContrate(sessionId:string){
  const lawyer=await prisma.lawyer.findFirst({
    where:{userId:sessionId}
  });

  const contrate=await prisma.contrat.findMany({
    where:{userId:lawyer?.id}
  });

  return contrate;
  
}


export async function ResolveContrate(sessionId:string,el:string) {
  const lawyerAccept=await prisma.lawyer.findFirst({
    where:{userId:sessionId}
  });
  const clientToreceive=await prisma.client.findFirst({
    where:{id:el}
  });
  if(!clientToreceive)throw new Error('le client est pas valide')

  const  addNotification=await prisma.clientNotification.create({
    data:{
      content:"accepter un contrat",
      type:"contrat",
      key:lawyerAccept?.id as string ,
      vue:false,
      userId: clientToreceive?.id  as string,
      name:lawyerAccept?.name as string
    }
  });
  if(!addNotification)throw new Error('ca ne marche pas ');
  
  return "tache effectué"
}