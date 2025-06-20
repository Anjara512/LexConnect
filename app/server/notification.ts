"use server";

import prisma from "@/lib/db";

// import { revalidatePath } from "next/cache";



export const getNotification = async (id: string) => {
  const user=await prisma.user.findFirst({
    where:{id:id}
  })
  const allLawyer = await prisma.lawyer.findFirst({
    where: { userId: user?.id },
  });
  const newNote = await prisma.notification.findMany({
    where: { userId: allLawyer?.id },
  });



  if (!newNote) {
    throw new Error("impossible de genrer la notification");
  }
  return newNote;
};

export const getClientNotification=async (sessionId:string) => {
  const client=await prisma.client.findFirst({
    where:{userId:sessionId}
  });

  const getNotification=await prisma.clientNotification.findMany({
where:{userId:client?.id}
  });
  
  return getNotification;
  
}



export const deleteNotifs=async (props:{id:string,key:string},sessionId:string ) => {
const deleter=await prisma.notification.delete({
  where:{id:props.id}
});
const getLawyerToreject=await prisma.lawyer.findFirst({
  where:{userId:sessionId}
})

const addPerme= await prisma.clientNotification.create({
  data:{
      content:"reffuser invitation",
      type:"invitation",
      key:getLawyerToreject?.id as string ,
      vue:false,
      userId: props.key as string,
      name:getLawyerToreject?.name as string
  }
});
if(!addPerme||!deleter)throw new Error('non effectué');

return "effacé"
  
}













