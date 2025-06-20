"use client";


import { addToFriend, getFriendId } from "@/app/server/community";
import { getDroit, getRedaction, getServicesParDomaine, valeurAjouter } from "@/app/server/getClientInfo";

import { getOneLawyer } from "@/app/server/getLawyerInfo";
import { sendMessageToLawyer } from "@/app/server/messages";
import {
  AlertDialog,


  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import {

  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Delete, MessageCircle, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from 'sonner'

import { z } from "zod";
import {
  contartSchema

} from "../contrat";
import { AddContrat } from "@/app/server/contrat";
import {
  DropdownMenu
  , DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";


// import { useState } from "react";


export interface Propser {
  id: string;
  userId: string;
  title: string;
  content: string;
  desc: string;
}

const messageSchema = z.object({
  message: z.string(),

});
type schema = z.infer<typeof messageSchema>

export default function Page() {
  const params = useParams();
  const { id } = params;
  const { data: session } = useSession();
  const [btnValue, setBtnValue] = useState("ajouter");
  const sessionId = session?.user?.id;

  const { data: cible } = useQuery({
    queryKey: ['cible'],
    queryFn: async () => await getOneLawyer(id as string)
  })


  const { data: friendId } = useQuery({
    queryKey: ["scop"],
    queryFn: async () => {

      return await getFriendId({ sessionId: sessionId as string })

    }
  })



  const { data: droit } = useQuery({
    queryKey: ['droit'],
    queryFn: async () => {

      const dr = await getDroit(id as string);
      if (dr) {
        const droitdes = dr?.desc.split('5');
        const droitdesc = droitdes?.map(el => el.toLocaleUpperCase());
        const droitContent = dr?.content.split('4');


        setaffiche(MelangerTableau(droitdesc, droitContent));
      }
      return dr;



    }
  });
  const { data: valeur } = useQuery({
    queryKey: ['va'],
    queryFn: async () => {
      const vals = await valeurAjouter(id as string);
      if (vals) {
        const droitdes = vals?.desc.split('5');
        const droitdesc = droitdes?.map(el => el.toLocaleUpperCase());
        const droitContent = vals?.content.split('4');


        setValAjout(MelangerTableau(droitdesc, droitContent));
      }

      return vals


    }
  });


  const [sprs, setsprs] = useState([""])
  const { data: spr } = useQuery({
    queryKey: ['spr'],
    queryFn: async () => {
      const spr = await getServicesParDomaine(id as string)
      if (spr) {
        const droitdes = spr?.desc.split('5');
        const droitdesc = droitdes?.map(el => el.toLocaleUpperCase());
        const droitContent = spr?.content.split('4');


        setsprs(MelangerTableau(droitdesc, droitContent));
      }
      return spr;


    }
  });


  const { data: redaction } = useQuery({
    queryKey: ['redaction'],
    queryFn: async () => {
      const joke = await getRedaction(id as string)
      if (joke) {
        const droitdes = joke?.desc.split('5');
        const droitdesc = droitdes?.map(el => el.toLocaleUpperCase());
        const droitContent = joke?.content.split('4');


        setredac(MelangerTableau(droitdesc, droitContent));
      }


      return joke;

    }
  });


  const [affiche, setaffiche] = useState([""]);

  const [redac, setredac] = useState([""]);

  const [valAjout, setValAjout] = useState([""]);



  const [type, settype] = useState(droit?.title);






  function MelangerTableau(tab1: string[], tab2: string[]) {
    const tabMelanger = [];
    const longuerMax = Math.max(tab1.length, tab2.length)
    for (let i = 0; i < longuerMax; i++) {
      if (i < tab1.length) {
        tabMelanger.push(tab1[i])
      }
      if (i < tab2.length) {
        tabMelanger.push(tab2[i])
      }
    }
    return tabMelanger;

  }



  const { register, handleSubmit, reset } = useForm<schema>({
    resolver: zodResolver(messageSchema)
  })
  const cibled = cible?.id;
  const mutation = useMutation({
    mutationFn: async (data: schema) => {
      return await sendMessageToLawyer(data, String(cibled), String(sessionId))

    },
    onSuccess: ((data) => {
      toast.success(data);

    }),
    onError: () => {
      toast.warning('message non envoyé');
    }

  });
  const Sending = (data: schema) => {
    mutation.mutate(data);
    reset()
  }


  const { mutate } = useMutation({
    mutationFn: async (id: string) => {

      return await addToFriend({ id, sessionId: String(sessionId) })



    },
    onSuccess: ((data) => {
      toast.success(data)

      setBtnValue('anuller');
    }),
    onError: () => {
      toast.warning("non envoyer")
    }
  })

  const JoinLawyer = async () => {
    mutate(String(id));
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["id"],
    queryFn: async () => {

      return await getOneLawyer(String(id))

    }

  });



  const contratMutation = useMutation({
    mutationKey: ["contrat"],
    mutationFn: async (props: { motif: string, budget: number, type: string }) => {
      return await AddContrat(props, String(id), String(sessionId))
    },
    onSuccess: (data) => {
      toast.success(data)

    },
    onError: (data) => {
      toast.warning("jefe");
      console.log(data)

    }
  })

  const sendContrate = (data: FormData) => {
    const motif = data.get('motif') as string;
    const budget = Number(data.get('budget'));
    const validateData = contartSchema.safeParse({ motif, budget });
    if (validateData.success) {
      const props = { motif: validateData.data.motif, budget: validateData.data.budget, type: type as string };
      contratMutation.mutate(props)
    }
    if (validateData.error) {
      console.error("le type n'est pas compatible ", validateData.error);

    }

  }






  if (isPending) {
    return (
      <div className={cn("flex flex-col bg-zinc-95 w-full h-screen ")}>
        <Skeleton className="w-5 h-5 rounded-md"></Skeleton>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-10 h-5"></Skeleton>
            </CardTitle>
          </CardHeader>
          <Skeleton className="w-3/4 h-20"></Skeleton>
        </Card>
      </div>
    );
  }
  if (error) {
    return <div>erro:{error.message}</div>;
  }

  return (

    <div className={cn("flex flex-col gap-10 bg-zinc-95 h-screen ")}>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="uppercase  font-bold ">{data?.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span>
            {" "}
            {data?.name} est un avocat specialisé dans le domaine du{" "}
            {data?.specialité} prêts a vous donneer ses services
          </span>
          <div className="flex flex-row gap-2 mt-3">
            <Button className="bg-blue-500">
              {
                friendId?.includes(data.id) ? (
                  "membre"
                ) :
                  <span onClick={JoinLawyer}>

                    {btnValue}
                  </span>
              }

            </Button>
            <AlertDialog >
              <AlertDialogTrigger className=" rounded-md p-2  bg-zinc-800 border-1 border-green cursor-pointer flex flex-row gap-1  ">

                Demander une services
              </AlertDialogTrigger>
              <AlertDialogContent className="  overflow-scroll h-3/4">
                <AlertDialogHeader className="flex justify-evenly ">
                  <AlertDialogTitle >
                    details de votre contrat
                    <AlertDialogCancel className="w-max h-max p-2 rounded-md bg-green-500 cursor-pointer text-white text-sm font-medium hover:ring-2 ring-blue-500 px-4 py-2">
                      <X />
                    </AlertDialogCancel>
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-3/4">


                  <form action={sendContrate} className=" flex flex-col gap-3 w-3/4 h-3/4  p-2">
                    <Card>
                      <CardTitle>Genre</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex justify-start border cursor-pointer  border-zinc-50 p-2 rounded-md ">
                          {type}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>

                          <DropdownMenuItem onClick={() => settype(droit?.title)}>
                            {droit?.title}

                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => settype(spr?.title)}>
                            {spr?.title}

                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => settype(valeur?.title)}>
                            {valeur?.title}

                          </DropdownMenuItem >
                          <DropdownMenuItem
                            onClick={() => settype(redaction?.title)}
                          >
                            {redaction?.title}

                          </DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Card>
                    <Card>
                      <CardTitle>MOTIF</CardTitle>
                      <Input name="motif" className="h-42 "></Input>
                    </Card>



                    <Card>
                      <CardTitle>BUDGET PREVU POUR LE SERVICE</CardTitle>
                      <Input name="budget" type="number" />

                    </Card>



                    <AlertDialogAction type="submit">envoyer</AlertDialogAction>
                  </form>

                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Drawer>
              <DrawerTrigger className="  w-max h-maxn flex flex-row  rounded-md bg-green-500 text-black font-medium text-sm px-4 py-2  ">
                <MessageCircle />
                Message
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Message</DrawerTitle>

                  <form onSubmit={handleSubmit(Sending)} className="flex flex-col">
                    <Input {...register('message')} />

                    <Button>send</Button>
                  </form>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose>
                    <Delete />
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </CardContent>
      </Card>
      <h2 className="uppercase font-bold text-green-400">Mes services</h2>
      <Card>
        <CardTitle>{droit?.title}</CardTitle>
        {
          affiche?.map((el, index) => (
            <p className={cn('font-medium', {
              "text-green-500 underline": droit?.content.split('4').indexOf(el) === -1
            })} key={index}>{el}</p>
          ))
        }


      </Card>
      <Card>
        <CardTitle>{redaction?.title}</CardTitle>

        {
          redac?.map((el, index) => (
            <p
              className={cn('font-medium', {
                "text-green-500 underline": redaction?.content.split('4').indexOf(el) === -1
              })}
              key={index}>{el}</p>
          ))
        }


      </Card>
      <Card>
        <CardTitle>{spr?.title}</CardTitle>

        {
          sprs.length !== 0 && sprs?.map((el, index) => (
            <p className={cn('font-medium', {
              "text-green-500 underline": spr?.content.split('4').indexOf(el) === -1
            })} key={index}>{el}</p>
          ))
        }


      </Card>
      <Card>
        <CardTitle>{valeur?.title}</CardTitle>

        {
          valAjout?.map((el, index) => (
            <p className={cn('font-medium', {
              "text-green-500 underline": valeur?.content.split('4').indexOf(el) === -1
            })} key={index}>{el}</p>
          ))
        }


      </Card>
    </div>
  );
}
