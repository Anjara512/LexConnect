"use server"
import prisma from "@/lib/db";
import { Promesse } from "../auth/services/page";

export const getConnectedUser = async (id: string) => {
  const getUser = await prisma.user.findFirst({
    where: { id: id },
  });

  const getClient = await prisma.client.findFirst({
    where: { userId: getUser?.id },
  });
  if (!getClient) throw new Error("utilisateur introuvable");

  return String(getClient?.name);
};

export const getAllLawyer = async () => {
  const lawyer = await prisma.lawyer.findMany();

  if (!lawyer) {
    throw new Error("requette non effectué");
  }

  return lawyer;
};

export const getCibledClient=async (id:string) => {
  const client=await prisma.client.findUnique({
    where:{id:id}
  });

  return client;
  
}


export const addService=async (fildredItems:Promesse[],email:string) => {


    

    const user=await prisma.user.findFirst({
      where:{email:email}
    });
    if(!user?.email) throw new Error('email non trouvé')
    

    const getLaw=await prisma.lawyer.findFirst({
      where:{userId:user?.id}
    });




    
    const item1=fildredItems.filter(item=>item.title==="conseil Juridique");
    const item2=fildredItems.filter(item=>item.title==="Redaction et Revision de document juridique");
    const item3=fildredItems.filter(item=>item.title==="domaine du droit");
    const item4=fildredItems.filter(item=>item.title==="suivi de domaine ajouté");

 
   
        
        
if(item1.length!==0){
const contenu =item1[0].Description.join('')
const desc =item1[0].content.join('')
await prisma.conseilJuridique.create({
  data:{
  title:item1[0].title as string,
  content:contenu as string ,
  desc:desc as string,
  userId:getLaw?.id as string
  }
  })
};
 if(item2.length!==0){
const contenu =item2[0].Description.join('')
const desc =item2[0].content.join('')
   await prisma.redaction.create({
   data:{
   title:item2[0].title as string,
   content:contenu as string ,
   desc:desc as string,
   userId:getLaw?.id as string
   }
   })
}

if(item3.length!==0){
const contenu =item3[0].Description.join('')
const desc =item3[0].content.join('')
  await prisma.serviceParDomaine.create({
  data:{
  title:item3[0].title as string,
  content:contenu as string ,
  desc:desc as string,
  userId:getLaw?.id as string
  }
  })

}
if(item4.length!==0){
  const contenu =item4[0].Description.join('');
  const desc =item4[0].content.join('');
  await prisma.valeurAjouter.create({
  data:{
  title:item4[0].title as string,
  content:contenu as string ,
  desc:desc as string,
  userId:getLaw?.id as string
  }
  })


}


    
    return "compte creer avec succés"
    }


    export const getDroit=async(id:string)=>{
      const droit=await prisma.conseilJuridique.findFirst({
        where:{userId:id}
      });

     
      return droit;

    }

    export const getRedaction=async(id:string)=>{
      const droit=await prisma.redaction.findFirst({
        where:{userId:id}
      });
      return droit

    }


    export const getServicesParDomaine=async (id:string) => {
      const spr=await prisma.serviceParDomaine.findFirst({
        where:{userId:id}
      });
      return spr
      
    }

    export const valeurAjouter=async (id:string) => {
      const val=await prisma.valeurAjouter.findFirst({
        where:{userId:id}

      });
      return val;
    }