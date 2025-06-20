"use client";
import { useUser } from "@/app/contexts/userContext";
import { addMainInfo } from "@/app/server/server";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import bcrypt from "bcryptjs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
import * as z from "zod";


export const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password1: z.string().min(5, "le mot de passe incorrecte"),
  password2: z.string().min(5, "le mot de passe incorrecte").optional(),
});

type formType = z.infer<typeof formSchema>

export default function Page() {
  const testUser = useUser();
  if (testUser === null) {
    throw new Error("test est null");
  }
  const User = testUser;

  const params = useSearchParams();
  const role = params?.get("role");
  const [err, seterr] = useState("")

  const { register, handleSubmit, reset } = useForm<formType>({
    resolver: zodResolver(formSchema)

  });
  const route = useRouter()

  const enregister = useMutation({
    mutationKey: ["register"],
    mutationFn: async (user: { email: string, password: string }) => {

      return await addMainInfo({ users: user, role: String(role) });


    },
    onSuccess: (data => {
      toast.success(data);

      route.push(`/auth/personal?role=${role}`);

    }),
    onError: () => {
      toast.warning("uen erreur s'est produit")
    }

  })



  const addUser = async (data: formType) => {
    if (data.password1 as string === data.password2 as string) {
      const hasedPass = await bcrypt.hash(data.password1, 8);
      User.email = data.email;
      User.password = hasedPass;
      const props = { email: User.email, password: User.password }

      enregister.mutate(props);
      reset()
    }
    else {
      seterr('les mot de passe doit etre similaire ')
    }
  }



  return (
    <div className="flex items-center h-screen  justify-center">

      <Card className="w-3/4 p-3">

        <CardTitle>
          Inscription

        </CardTitle>
        <form onSubmit={handleSubmit(addUser)} className="flex flex-col gap-2">


          <Input type="email" {...register('email')} className="w-3/4"></Input>


          <label>mot de passe</label>
          <Input type="password" {...register('password1')} className={cn("w-3/4", {
            "border-red-500 text-red-500": err
          })}></Input>
          {err.length !== 0 ? <span className="text-red-500 text-sm ">{err}</span> : null}
          <label> confirmez votre password</label>

          <Input type="password" {...register('password2')} name="password2" className={cn("w-3/4", {
            "border-red-500 text-red-500": err
          })}></Input>
          {err.length !== 0 ? <span className="text-red-500 text-sm ">{err}</span> : null}
          <Button className=" w-max " disabled={enregister.isPending ? true : false} variant={"outline"}>
            {enregister.isPending ? "loading" : "suivant"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
