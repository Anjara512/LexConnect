"use client"
import { useUser } from "@/app/contexts/userContext";
import { addService } from "@/app/server/getClientInfo";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Command, CommandItem, CommandGroup, CommandSeparator } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


import { ChangeEvent } from "react";
import { toast, Toaster } from "sonner";

export type Promesse = {
 title: string;
 content: string[];
 Description: string[];
}

const Page = () => {
 const testUser = useUser();

 if (testUser === null) {
  throw new Error("test est null");
 }
 const User = testUser;
 const items: Promesse[] = [
  {
   title: "conseil Juridique",
   content: [],
   Description: []
  },
  {
   title: "Redaction et Revision de document juridique",
   content: [],
   Description: []
  },
  {
   title: " domaine du droit",
   content: [],
   Description: []
  },
  {
   title: "suivi de domaine ajouté",
   content: [],
   Description: []
  }]



 const getChange = (e: ChangeEvent<HTMLInputElement>) => {
  const changeValue = e.target.value.split(',');
  const content = changeValue[0];
  const desc = changeValue[1];

  if (e.target.checked === true) {
   items[0].content.push(content);
   items[0].Description.push(desc);
  }
  else {
   items[0].Description = items[0].Description.filter(el => el !== desc);
   items[0].content = items[0].Description.filter(el => el !== content);

  }

 }

 const Arround = (e: ChangeEvent<HTMLInputElement>) => {
  const changeValue = e.target.value.split(',');
  const content = changeValue[0];
  const desc = changeValue[1];

  if (e.target.checked === true) {
   items[1].content.push(content);
   items[1].Description.push(desc);
  }
  else {
   items[1].Description = items[1].Description.filter(el => el !== desc);
   items[1].content = items[1].Description.filter(el => el !== content);

  }

 }


 const droiter = (e: ChangeEvent<HTMLInputElement>) => {
  const changeValue = e.target.value.split(',');
  const content = changeValue[0];
  const desc = changeValue[1];

  if (e.target.checked === true) {
   items[3].content.push(content);
   items[3].Description.push(desc);
  }
  else {
   items[3].Description = items[3].Description.filter(el => el !== desc);
   items[3].content = items[3].Description.filter(el => el !== content);

  }

 }

 const famille = (e: ChangeEvent<HTMLInputElement>) => {
  const changeValue = e.target.value.split(',');
  const content = changeValue[0];
  const desc = changeValue[1];

  if (e.target.checked === true) {
   items[2].content.push(content);
   items[2].Description.push(desc);

  }
  else {
   items[2].Description = items[2].Description.filter(el => el !== desc);
   items[2].content = items[2].Description.filter(el => el !== content);


  }

 }

 const route = useRouter();


 const servicesMutation = useMutation({
  mutationFn: async (fildredItems: Promesse[]) => {
   return await addService(fildredItems, User?.email as string)



  },
  onSuccess: (data => {
   toast.success(data);
   route.push(`/auth/login?role=lawyer`);

  }),
  onError: (err => {
   console.error('error', err)
  })
 })
 const addServices = () => {
  const fildredItem = items.filter(el => el.content.length !== 0);
  servicesMutation.mutate(fildredItem);
 }




 return (
  <div className="flex-col gap-2">
   <Toaster />
   <Label>cocher les services que vous pouriez donner</Label>
   <form action={addServices} className="flex flex-col "  >
    <header className="flex w-full justify-end"> <Button className="fixed z-20 bg-green-500">finish</Button></header>
    <div className="flex flex-col ml-10 gap-5 ">

     {/* premier card */}
     <Card className="w-3/4">
      <CardTitle className="mb-2">Conseil juridiques</CardTitle>
      <Command >
       <CommandGroup>
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => getChange(e)} value={"  Avis juridiques5, Redaction des avis  formel sur une question spécifique4"} />
           Avis juridiques
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>

           Redaction des avis  formel sur une question
           spécifique
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => getChange(e)} value={"redaction des documents5, Examens et explcation des contrats lettres documents administratifs4"} />
           redaction des documents
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Examens et explcation des contrats, <br />
           lettres documents administratifs
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2  ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => getChange(e)} value={
            "   Assistance a la comprehension legale5,Simplification du jargon Juridique pour le rendre accésible4"

           } />
           Assistance a la comprehension legale
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Simplification du jargon <br />
           Juridique pour le rendre accésible


          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => getChange(e)} value={"Informations sur les droits et obligation5,Expliquer les droits et devoirs legaux des utilisateus dans diverses situations (travail ,consomation ,immobilier etc...)4 "} />
           Informations sur les droits et obligation
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>

           Expliquer les droits et devoirs legaux des utilisateus <br />
           dans diverses situations (travail ,consomation ,immobilier etc...)
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
       </CommandGroup>
      </Command>
     </Card>



     {/* deuxiemme card */}

     <Card className="w-3/4">
      <CardTitle className="mb-2">Redaction et Revision de document juridique</CardTitle>
      <Command >
       <CommandGroup>
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => Arround(e)} value={"Contrats5,Redactions des contrats(bail,vente ,prestation de services,travail...),revision et securisation des contrat existants4"} />
           Contrats
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>

           Redactions des contrats(bail,vente ,prestation de services,travail...),revision et securisation des contrat existants
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => Arround(e)} value={"lettre et mise en demeure5,redaction des courier officiel.redaction de mise en demeure4"} />
           Lettre et mise en demeure
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           redaction des courier officiel <br />
           redaction de mise en demeure
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => Arround(e)} value={
            "   status de la société5,pour la création ou la modification des entreprises4"

           } />
           Status de société
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Pour la création ou la modification des entreprises


          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => Arround(e)} value={"Condition genrales de Vente (CGV)/d utilisation(CGU)5,Essentiels pour les entreprise en lignes4"} />
           Condition genrales de Vente (CGV)/d utilisation(CGU)
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Essentiels pour les entreprise en lignes
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => Arround(e)} value={"Testaments et succéssion5,Rédaction de testaments assistance pour les demandes  successoriales4"} />
           Testaments et succéssion
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Rédaction de testaments assistance pour les demandes  successoriales
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => Arround(e)} value={"Accord divers5,Accord de confidientialité ,de partenariat,etc...4 "} />
           Accord divers
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Accord de confidientialité ,de partenariat,etc...
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
       </CommandGroup>
      </Command>
     </Card>

     {/* trooisiéme card  */}
     <Card className="w-3/4">
      <CardTitle className="mb-2">Services a valeur ajoutée</CardTitle>
      <Command >
       <CommandGroup>
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => droiter(e)} value={"Suivi de dossier en ligne5,Permettre aux client de suivre l avancemrnt de leur dossier4"} />
           Suivi de dossier en ligne
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Permettre aux client de suivre l avancemrnt de leur dossier

          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => droiter(e)} value={"Gestion documentaire sécurisés5 ,Stockage securisés des document juridiques4"} />
           Gestion documentaire sécurisés
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Stockage securisés des document juridiques
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => droiter(e)} value={
            "   Calculateur juridique5,calcul d indemnité de licenciement et de préavis4"

           } />
           Calculateur juridique
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           calcul d indemnité de licenciement et de préavis


          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => droiter(e)} value={"Aide a la recherche d aide juridictionnelle ou subventions5,"} />
           Aide a la recherche d aide juridictionnelle oiu subventions
          </div>




         </Collapsible>
        </CommandItem>
       </CommandGroup>
      </Command>
     </Card>

     {/* dernier card  */}
     <Card className="w-3/4">
      <CardTitle className="mb-2">Domaines du droit </CardTitle>
      <Command >
       <CommandGroup>
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => famille(e)} value={"Droit de travail5 ,Contrats de travaille licenciement rupture convetionnelles harcelement.calcul d indemnité4 "} />
           Droit de travail
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           .Contrats de travaille licenciement,rupture, convetionnelles, harcelement <br />
           .Calcul d indemnité

          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 text-sm font-medium ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => famille(e)} value={"Droit de la famille5  ,divorce.separation.garde enfant.separation4"} />
           Droit de la famille
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           divorce,separation,garde enfant,separation
          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => getChange(e)} value={
            "Droit immobilier5,Baux,probleme de voisinagevices cacheéescopropriéte.Ligites localtifs4"

           } />
           Droit immobilier
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           .Baux,probleme de voisinage,vices cacheées,copropriéte
           .Ligites localtifs


          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
        <CommandSeparator />
        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => getChange(e)} value={
            "Droit administratif5,Realtion avec l administration  recours contre des decisions  administratives4"

           } />
           Droit administratif
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
           Realtion avec l administration  recours contre des decisions  administratives


          </CollapsibleContent>

         </Collapsible>
        </CommandItem>

        <CommandItem >
         <Collapsible
         >
          <div className="flex flex-row gap-2 ">

           <Input className="w-max h-max" type="checkbox" onChange={(e) => getChange(e)} value={
            "Droit  fiscale5,Conseil sur les impots declarations litiges fiscaux4"

           } />
           Droit  fiscale
          </div>

          <CollapsibleTrigger
           className="flex flex-row  justify-between"
          >
           <span className="w-max h-max px-2 py-1 rounded-full bg-black text-white  ">...</span>
          </CollapsibleTrigger>
          <CollapsibleContent>


           Conseil sur les impots, declarations, litiges fiscaux

          </CollapsibleContent>

         </Collapsible>
        </CommandItem>
       </CommandGroup>
      </Command>
     </Card>
    </div>
   </form>

  </div >
 )
}

export default Page;
