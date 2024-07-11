import { z } from "zod";

export type FormType = {
  email: string;
  password: string;
};

export type RoleType = "family" | "student";

export type RegisterFormType = FormType & {
  isFamily: boolean;
  role: RoleType; // Ajout de la propriété role
};

export type FormValuesType = {
  language: string;
  region: string;
};

export type LogInFormType = FormType;

export const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  role: z.enum(["family", "student"]), // Ajout de la validation de role
});
