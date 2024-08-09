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
    familyDailyRate: z.number().min(0).nullable(),
    familyAvailabilities: z.array(availabilitySchema).nullable(), 
    familyAcceptedPersons: z.array(z.string()),
    photoUrl: z.string(),
    studentAge: z.number().min(0).nullable().optional(),
});
