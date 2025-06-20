"use server"
import prisma from "@/lib/db";





export async function addToFriend({ id, sessionId }: { id: string; sessionId: string; }): Promise<string> {

  // const user=await prisma.user.findFirst({
  //  where: {id:sessionId}
  // })
  const clientName = await prisma.client.findFirst({
    where: { userId: sessionId }
  });


  if (!clientName?.id) throw new Error("clientnName  n'existe pas ");


  const cibledLawer = await prisma.lawyer.findFirst({
    where: { id: id }
  });


  // const succés = await prisma.friendLaw.create({
  //   data: {
  //     name: String(clientName?.name),
  //     userId: String(cibledLawer?.id),
  //     key: String(clientName?.id),
  //     nbrDeContrat: "aucune ",
  //   }
  // });


  const notification = await prisma.notification.create({
    data: {
      content: "un client veux vous contacter",
      TimeToReceive: new Date(),
      userId: cibledLawer?.id as string,
      type: "invitation",
      vue: false,
      key: clientName?.id,
      name:clientName?.name
    },
  });
  if (!notification) {
    throw new Error('ca ne marche pas ');

  }

  return "invitation ennvoyer avec succéss";

}


export const MyFriend=async (sessionId:string,id:{identif:string,el:string})  => {
  const clientToAdd=await prisma.client.findFirst({
    where:{id:id.identif}
  });
 

  // const user=await prisma.user.findFirst({
  //   where:{id:sessionId}
  // })
  const getLawyerAccepte=await prisma.lawyer.findFirst({
    where:{userId:sessionId}
  });

    if(!getLawyerAccepte)throw new Error('le lawyer est introuvable');
  const friendList=await prisma.friendLaw.create({
data:{
  name:clientToAdd?.name as string,
  key:id.identif,
  nbrDeContrat:"aucune",
  userId:String(getLawyerAccepte?.id)
}
  });

  const LawyerList=await prisma.friends.create({
    data:{
      name:String(getLawyerAccepte?.name),
      key:String(getLawyerAccepte?.id),
       nbrDeContrat:"aucune",
  userId:String(clientToAdd?.id)
    }

  });

  const addNotifClient=await prisma.clientNotification.create({
    data:{
      content:"accepter invitation",
      type:"invitation",
      key:getLawyerAccepte?.id,
      vue:false,
      userId:clientToAdd?.id as string,
      name:getLawyerAccepte?.name as string,
    }
  })
  if(!friendList||!LawyerList||!addNotifClient)throw new Error('erreur');
  

  if(friendList&&LawyerList){

    await prisma.notification.delete({
      where:{id:id.el}
    });
  }

  return "vous êtes maintenant amis";
  
}

export const getFriendLawyer=async(id:string)=>{
  // const users=await prisma.user.findFirst({
  //   where:{id:id}
  // });
  
  const LawyerChoice=await prisma.lawyer.findFirst({
    where:{userId:id}
  })
  
  
  
     const lawfriender=await prisma.friendLaw.findMany({
      where:{userId:LawyerChoice?.id}
    });

    if(!lawfriender) throw new Error('impossible de charger les données');
    else if(lawfriender.length===0){
      return "zero"
    }
    return lawfriender;


}

export const getFriendClient=async (id:string) => {
   const users=await prisma.user.findFirst({
    where:{id:id}
  });
  const  clientChoice=await prisma.client.findFirst({
    where:{userId:users?.id}
  });

    const friender=await prisma.friends.findMany({
      where:{userId:clientChoice?.id}
    });
    if(!friender) throw new Error('impossible de charger les données');
    return friender;

  
  
}

export const deleteFriend=async(id:string)=>{
  


  const contact=await prisma.friendLaw.delete({
    where:{id:id}
  })
  if(!contact)throw new Error("l'element a supprimer est introuvable");

 
  return "element supprimer avec suuces";
}

export async function getFriendId({ sessionId }: { sessionId: string; }): Promise<string[]> {
  const client = await prisma.client.findFirst({
    where: { userId: sessionId }
  });
  const getFriend = await prisma.friends.findMany({
    where: { userId: client?.id }
  });

  const getId = getFriend.map(el => el.key);

  return getId;
}