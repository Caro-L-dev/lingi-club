import { z } from "zod";

export type FormType = {
    email: string;
    password: string;
}

export type RegisterFormType = FormType & {
    isFamily: boolean;
}

export type FormValuesType = {
    language: string;
    region: string;
};

export type LogInFormType = FormType

export const formSchema = z.object({
    displayName: z.string(),
    email: z.string(),
    description: z.string(),
    city: z.string(),
    region: z.any(),
    familyLangages: z.string(),
    photoUrl: z.string(),
    studentAge: z.string(),
});