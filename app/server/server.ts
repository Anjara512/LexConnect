"use server";


import { ClientInformation, User } from "../types/type";
import { FormData } from "../auth/personalLawyer/page";
import prisma from "@/lib/db";

export const addMainInfo = async function ({ users, role }: { users: { email: string; password: string; }; role: string; }): Promise<"donné ajouté a la base données" | undefined> {
  const response = await prisma.user.create({
    data: {
      email: users.email,
      password: users.password,
      role: role,
    },
  });
  if (response) {

    return "donné ajouté a la base données";

  }


};

export const addInformation = async (
  user: User,
  role: string,
  client: ClientInformation
) => {
  if (role === "client" && client.profession) {
    const users = await prisma.user.findUnique({
      where: { email: user.email },
    });

    const adding = await prisma.client.create({
      data: {
        name: client.name,
        profession: client.profession,
        age: client.age,
        gender: client.gender,
        userId: users?.id as string ,
        localisation: client.localisation,
      },
    });
    if (!adding) {
      throw new Error("impossible de faire l'ajout des donnés");
    }
    return "reqûette succés";
  }
};

export const AddProfesionalInformation = async (
  data: FormData,
  client: ClientInformation,
  user: User
) => {
  const users = await prisma.user.findUnique({
    where: { email: user.email },
  });

  const law = await prisma.lawyer.create({
    data: {
      name: client.name,
      age: client.age,
      gender: client.gender,
      userId: users?.id,
      localisation: client.localisation,
      budget: data.budget,
      specialité: data.specialité,
    },
  });
  const lawyers = await prisma.lawyer.findFirst({
    where: { name: client.name },
  });

  const dip = await prisma.diplome.create({
    data: {
      nom: data.diplome,
      ecole: data.etablisement,
      anne: data.année,
      userId: lawyers?.id,
    },
  });
  const exp = await prisma.experience.create({
    data: {
      poste: data.poste,
      durant: data.dureé,
      userId: lawyers?.id,
    },
  });
  if (!exp && !dip && !law) {
    throw new Error("erreur lors de l'ajout des données a la base de données");
  }
  return "compte creer avec succés";
};


