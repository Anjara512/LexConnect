"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Medal, GraduationCap } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddProfesionalInformation } from "@/app/server/server";
import { useUser } from "@/app/contexts/userContext";
import { useRouter, useSearchParams } from "next/navigation";

const profSchema = z.object({
  diplome: z.string(),
  etablisement: z.string(),
  année: z.string(),
  poste: z.string(),
  dureé: z.string(),
  specialité: z.string(),
  budget: z.string(),
});

export type FormData = z.infer<typeof profSchema>;
export default function Page() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(profSchema),
  });
  const testUser = useUser();
  if (testUser === null) {
    throw new Error("test est null");
  }
  const User = testUser;

  const params = useSearchParams();
  const client = params?.get("info");

  const addMore = async (data: FormData) => {
    if (client) {
      const el = decodeURIComponent(client);
      const parseData = JSON.parse(el);
      const finalisation = await AddProfesionalInformation(
        data,
        parseData,
        User
      );
      if (finalisation) {
        console.log("compte creer avec succés")
        route.push("/auth/services");
      }
    }
  };
  return (
    <div className="flex flex-col  h-screen  ">
      <h1 className="ml-2 mt-3 uppercase font-mono text-sm md:text-4xl">
        information proffesionnelle
      </h1>
      <form
        action=""
        onSubmit={handleSubmit(addMore)}
        className=" flex flex-col ml-2 gap-5 mt-4  w-3/4"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row gap-1">
              vos diplome <sup className="text-red-500">*</sup>
              <GraduationCap />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col  ">
              diplome:
              <Input
                className="w-3/4"
                type="text"
                {...register("diplome")}
              ></Input>
            </div>
            <div className="flex flex-col  ">
              etablisement:
              <Input
                className="w-3/4"
                type="text"
                {...register("etablisement")}
              ></Input>
            </div>
            <div className="flex flex-col ">
              Anné d obtention:
              <Input
                className="w-3/4"
                type="text"
                {...register("année")}
              ></Input>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row gap-1 ">
              experience
              <sup className="text-red-500">*</sup>
              <Medal />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col  ">
              Poste:
              <Input
                className="w-3/4"
                type="text"
                {...register("poste")}
              ></Input>
            </div>
            <div className="flex flex-col ">
              durrée:
              <Input
                className="w-3/4"
                type="number"
                {...register("dureé")}
              ></Input>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              specialité <sup className="text-red-500">*</sup>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col  ">
              droit:
              <Input
                className="w-3/4"
                type="text"
                {...register("specialité")}
              ></Input>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              budget: <sup className="text-red-500">*</sup>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col  ">
              tarif:
              <Input
                className="w-3/4"
                type="number"
                {...register("budget")}
              ></Input>
            </div>
          </CardContent>
        </Card>
        <Button className="mb-4  bg-green-500 text-neutral-900">
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
