"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, "le mot de passe dois au moins contenir 5 lettre")
    .max(20, "le mot de passe ne dois pas depasser les 20 caractére"),
});

export type LoginType = z.infer<typeof loginSchema>

export default function Page() {
  const params = useSearchParams();
  const role = params?.get("role");
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginType>({
    resolver: zodResolver(loginSchema)
  });
  const route = useRouter();
  const [genneralError, setGeneralError] = useState<string | null>(null)

  const onSubmit = async (data: LoginType) => {
    setGeneralError(null);

    if (data) {
      try {
        const log = await signIn("credentials", {
          email: data.email,
          password: data.password,
          role: role,
          redirect: false,

        });
        if (log?.error) {
          if (log.error === "CredentialsSignin") {
            setError('password', {
              type: "manual",
              message: "Mot de passe incorrecte"
            })

          }
          else {
            setGeneralError(log.error)
          }
        }
        else {
          route.push(`/${role}/dashboard`);

        }


      } catch (err) {
        console.error("error", err);
      }
    }
  };
  const { theme } = useTheme()
  return (
    <div className="flex flex-col gap-2  h-screen   items-center  ">
      <div className={cn("w-3/4 mt-10 flex flex-col  gap-2 p-6 rounded-lg shadow-md border-1 border-white", {
        "border-black": theme !== "dark"
      })}>
        <Card className="w-max p-2 ">
          <CardTitle>connexion en tant que  {role === "client" ? "client" : "avocat"}</CardTitle>

        </Card>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label>Email</label>

          <Input type="email"  {...register('email')} className={cn("w-3/4", {
            "border-2 border-red-500 text-red-500": errors.email
          })}></Input>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
          <label>password</label>
          <Input type="password" {...register('password')} className={cn("w-3/4", {
            "border-2 text-red-500 border-red-500": errors.password
          })}></Input>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}

          {genneralError &&
            <p
              className="mt-2 text-sm text-red-600"
            >{genneralError}</p>}
          <Button
            className=" w-max justify-center bg-orange-300 rounded-lg hover:outline-none focus:ring ring-500-blue text-white "
            variant={"outline"}
          >
            {isSubmitting ? "loading..." : "login"}
          </Button>
        </form>
        <Button className="" variant={"ghost"}>
          google
        </Button>
        <Button className="" variant={"ghost"}>
          github
        </Button>

        <Link className="hover:underline text-blue-500" href={`/auth/createUser/?role=${role}`}>
          creer un compte {role === "client" ? "client" : "avocat "}
        </Link>
      </div>
    </div>
  );
}
