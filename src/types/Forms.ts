// types/Forms.ts
import { z } from "zod";

export type FormType = {
  email: string;
  password: string;
};

export type RoleType = "family" | "student";

export type RegisterFormType = FormType & {
  isFamily: boolean;
  role: RoleType; // Ajout de la propriété role
  email: string;
  password: string;
};

export type FormValuesType = {
  language: string;
  region: string;
};

export type LogInFormType = FormType;

const availabilitySchema = z.object({
  start: z.date(),
  end: z.date(),
});

export const formSchema = z.object({
  displayName: z.string(),
  email: z.string(),
  description: z.string(),
  city: z.string(),
  region: z.string(),
  familyLanguage: z.string(),
  familyDailyRate: z.string(),
  familyAvailabilities: z.array(availabilitySchema).nullable(),
  photoUrl: z.string(),
  studentAge: z.string(),
});
