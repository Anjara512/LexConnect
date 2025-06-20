"use server"
import prisma from "@/lib/db";
import { Msg } from "../lawyer/dashboard/msg/page";


export const sendMessageToLawyer = async (
  data: { message: string },
  currentId: string,
  sessionId: string
) => {
  const theReceiver = await prisma.lawyer.findFirst({
    where: { id: currentId },
  });

  
  


  const clientToSend = await prisma.client.findFirst({
    where: { userId: sessionId }
  });


 

  const date=new Date();

  
    const messageSendSuccés = await prisma.contact.create({
      data: {
        name: clientToSend?.name as string,
        contenu: data.message,
        date:date,
        userId: theReceiver?.id as string ,
        key:theReceiver?.id as string ,
     
      },
    });

    if (!messageSendSuccés) {
      throw new Error("use erreur est survenue");
    }

     const messageClientSendSuccés = await prisma.clientContact.create({
      data: {
        name: theReceiver?.name as string,
        contenu: data.message,
        date:date,
        userId: clientToSend?.id as string ,
key:theReceiver?.id as string,

       
      },
    });
    if (!messageSendSuccés||!messageClientSendSuccés) {
      throw new Error("use erreur est survenue");
    }


  return "message envoyés";
};

export async function sendMessageToClient({ data, currentChat, sessionId }: { data: { message: string; }; currentChat: string; sessionId: string; }): Promise<string> {

  const clientReciever = await prisma.client.findFirst({
    where: { id: currentChat }
  });


  const senderLawyer = await prisma.lawyer.findFirst({
    where: { userId: sessionId }
  });

  if (!senderLawyer) throw new Error('utilisateur introuvable');
 

  const date = new Date();
  const keys = clientReciever?.id;


  const messageSendSuccés = await prisma.clientContact.create({
    data: {
      name: senderLawyer?.name as string,
      contenu: data.message,
      date: date,
      userId: clientReciever?.id as string,
      key: keys as string ,
    },
  });



  const messageClientSendSuccés = await prisma.contact.create({
    data: {
      name: clientReciever?.name as string,
      contenu: data.message,
      date: date,
      userId: senderLawyer?.id as string,
      key: keys as string,
    },
  });
  if(!messageClientSendSuccés||!messageSendSuccés){
   throw new Error('impossible d envoie')
  }




  return "envoie reussi";


}

export const getMessage=async (id:string,curr:string) => {

  function SortedMesssag(messages:Msg[]){
    return [...messages].sort((a,b)=>{
      const dateA=new Date(a.date).getTime();
      const dateB=new Date(b.date).getTime();

      return dateA-dateB;

    })
  }
  const user=await prisma.user.findFirst({where:{id:id}});

  const cibledLawyer=await prisma.lawyer.findFirst({
    where:{userId:user?.id}
  }); 

  const cibledClient=await prisma.client.findFirst({
    where:{userId:user?.id}
  })
  
if(cibledLawyer){


  const messages=await prisma.contact.findMany({
  where:{userId:cibledLawyer?.id}
  });
  const myMessages=messages.filter(el=>el.key===cibledLawyer?.id);
  const herMessages=messages.filter(el=>el.key===curr);

  const ourMessages=myMessages.concat(herMessages);


  return SortedMesssag(ourMessages);

}

else if(cibledClient){
   const messages=await prisma.clientContact.findMany({
  where:{userId:cibledClient?.id}
  });
  const myMessages=messages.filter(el=>el.key===cibledClient?.id);
  const herMessages=messages.filter(el=>el.key===curr);

  const ourMessages=myMessages.concat(herMessages);
  return SortedMesssag(ourMessages);
}


}




  


export const getClientMsg=async(id:string)=>{

const client=await prisma.client.findFirst({
  where:{userId:id}
});


const msgs=await prisma.clientContact.findMany({
  where:{userId:client?.id }
})

return msgs;
}
export const getInviterName=async(id:string)=>{
  const inviteur=await prisma.client.findFirst({
    where:{id:id}
  });
  if(!inviteur)throw new Error('inviteur introuvable');
  return inviteur;
}

