export interface User {
  email: string;
  password: string;
}

type local =
  | "antananarivo"
  | "fianarastoa"
  | "toamasina"
  | "antsiranana"
  | "toliara"
  | "mahajanga";

type genders = "homme" | "femme" | "autre" | "preferer ne pas dire";
export interface ClientInformation {
  name: string;
  profession?: string | null;
  age: number;
  localisation: local;
  gender: genders;
}
export interface LawyerInformation {
  name: string;
  age: number;
  localisation: local;
  gender: genders;
}

interface Diplome {
  ecole: string;
  anne: Date;
  nom: string;
}

interface Experience {
  poste: string;
  anne: Date;
}
export interface Notification {
  id?: string;
  userId?: string;
  content: string | null;
  TimeToReceive: Date | null;
  vue: boolean | null;
}

export interface Lawyer {
  notification: Notification[];
  dipome: Diplome[];
  experience: Experience[];
}

export interface LawyerTable {
  id?: string;
  userId?: string;
  name: string | null;
  age: number | null;
  localisation: local | null;
  gender: genders | null;
  budget: string | null;
  specialité: string | null;
}
