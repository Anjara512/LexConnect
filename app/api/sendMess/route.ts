import prisma from "@/lib/db";
import { NextResponse } from "next/server";




export async function POST(request:Request){
 const {data,id:joke,sessionId}=await request.json();
 const date=new Date();

 try {

  const cibledClient=await prisma.client.findFirst({
   where:{id:joke}
  });
  const senderLawyer=await prisma.lawyer.findFirst({
   where:{userId:sessionId}
  });

  const message=await prisma.contact.create({
   data:{
    name:cibledClient?.name as string,
    contenu:String(data.message),
    date:date,
    key:cibledClient?.id as string ,
    userId:senderLawyer?.id as string 
   }
  });
  if(!message)throw new Error('ca ne marche pas ')

   return "envoie du message succés"
  
 } catch (err) {
  console.error(err)
  return NextResponse.json({error:"Erreur lors de l'envoie du message"},{status:500})
 }
}