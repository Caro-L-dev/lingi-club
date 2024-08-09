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
    displayName: z.string().min(3, 'Le nom d\'affichage doit contenir au moins 3 caractères'),
    email: z.string(),
    description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
    city: z.string().min(3, 'La ville doit contenir au moins 3 caractères'),
    region: z.string().min(1, 'La région est requise'),
    familyLanguage: z.string().min(1, 'La langue de la famille est requise'),
    familyDailyRate: z.number().min(0).nullable(),
    familyAvailabilities: z.array(availabilitySchema).nullable(), 
    familyAcceptedPersons: z.array(z.string()).nullable(),
    photoUrl: z.string().nullable(),
    studentAge: z.number().min(0).nullable().optional(),
});