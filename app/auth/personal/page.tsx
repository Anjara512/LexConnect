"use client";
import { useUser } from "@/app/contexts/userContext";
import { addInformation } from "@/app/server/server";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardTitle } from "@/components/ui/card";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { z } from "zod";

const formShema = z.object({
  name: z.string(),
  age: z.number().min(2, "vous ete encore mineur"),
  profession: z.string().optional().nullable(),
  localisation: z.enum([
    "antananarivo",
    "fianarastoa",
    "toamasina",
    "antsiranana",
    "toliara",
    "mahajanga",
  ]),
  gender: z.enum(["homme", "femme", "autre", "preferer ne pas dire"]),
});



export default function Page() {
  const route = useRouter();
  const testUser = useUser();
  if (testUser === null) {
    throw new Error("test est null");
  }
  const User = testUser;
  console.log(User);

  const params = useSearchParams();
  const role = params?.get("role");

  const [date, setdate] = useState<Date>(new Date());
  const [aff, setaff] = useState(false);
  const [gender, setgender] = useState("homme");
  const [localisation, setlocalistaion] = useState("antananarivo");
  const datapickerTrue = () => {
    setaff(aff === true ? false : true);
  };

  const getAge = (el: Date): number => {
    const born = el.getFullYear();
    const age = Number(new Date().getFullYear()) - Number(born);
    return age;
  };

  const localisationChoice = [
    "antananarivo",
    "fianarastoa",
    "toamasina",
    "antsiranana",
    "toliara",
    "mahajanga",
  ];

  const changeGender = (e: string) => {
    setgender(e);
  };
  const changeLocalisation = (e: string) => {
    setlocalistaion(e);
  };
  const genderChoie = ["homme", "femme", "autre", "preferer ne pas dire"];

  const addInformationToDataBase = async (data: FormData) => {
    const Info = {
      name: data.get("name") as string,
      profession: data.get("profession") as string,
      gender: gender,
      age: Number(getAge(date)),
      localisation: localisation,
    };
    const testInfo = formShema.parse(Info);
    if (testInfo && role) {
      if (role === "client") {
        try {
          const addInfo = await addInformation(User, role, testInfo);
          if (addInfo) {
            console.log("donnés ajoutée avec succé");
            User.email = " ";
            User.password = " ";
            route.push("/auth/login?role=client");
          }
        } catch (error) {
          console.error("err", error);
        }
      } else {
        route.push(
          `/auth/personalLawyer?info=${encodeURIComponent(
            JSON.stringify(testInfo)
          )}`
        );
      }
    }
  };



  return (
    <div className=" flex flex-col  h-screen gap-2 ">
      <h1 className="text-2xl font-medium  md:text-4xl uppercase">
        personnal information
      </h1>
      <form
        action={addInformationToDataBase}
        className=" flex flex-col  gap-4 w-3/4 ml-5 md:ml-10 "
      >
        <Card className="pl-3">
          <CardTitle>name</CardTitle>
          <Input name="name" className="w-3/4" type="text"></Input>
        </Card>
        <Card>
          <CardTitle>votre de date de naissance</CardTitle>
          <div
            className="w-max  p-2 cursor-pointer  rounded-md border-1 border-white "
            onClick={datapickerTrue}
          >


            {date ? date?.toLocaleDateString() : "date de naissance"}
          </div>

          {aff && (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setdate}
              onDayClick={() => setaff(!aff)}
            />
          )}
          {role === "client" && (
            <div>
              <label htmlFor="profession">professon</label>
              <Input name="profession" type="text" />
            </div>
          )}
        </Card>

        <div className="flex flex-col gap-8  items-start">

          <Card className="p-3 flex flex-row ">
            <CardTitle>genre:</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-start border-2 border-white rounded-md  p-2">
                {gender}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {genderChoie.map((el, index) => (
                  <DropdownMenuItem
                    onClick={() => changeGender(el)}
                    key={index}
                  >
                    {el}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </Card>

          <Card className="p-3 flex flex-row ">

            <CardTitle>localisation</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-start border-2 border-white rounded-md  p-2">

                {localisation}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {localisationChoice.map((el, index) => (
                  <DropdownMenuItem
                    onClick={() => changeLocalisation(el)}
                    key={index}
                  >
                    {el}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        </div>
        <Button className="flex justify-start w-max" variant={"default"}>
          suivant
        </Button>
      </form>
    </div>
  );
}
