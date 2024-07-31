type Availability = {
  start: Date;
  end: Date;
}

export type RegionType = "Auvergne-Rhône-Alpes" | "Bourgogne-Franche-Comté" | "Bretagne" | "Centre-Val de Loire" | "Corse" | "Grand Est" | "Hauts-de-France" | "Île-de-France" | "Normandie" | "Nouvelle-Aquitaine" | "Occitanie" | "Pays de la Loire" | "Provence-Alpes-Côte d'Azur" | null

export type AcceptedPersonType = "enfants" | "ados" | "adultes" | "familles" | "couples" | "2 personnes" | "> 2 personnes" | "TOUS"

export type UserType = {
    uid: string;
    isFamily: boolean;
    email: string;
    displayName: string;
    city: string;
    region: RegionType;
    description: string | null;
    emailVerified: boolean;
    photoUrl: string;
    creationDate: Date | null;
    studentAge: number | null;
    familyDailyRate: number | null;
    familyLanguage: string;
    familyAvailabilities: Availability[];
    familyAcceptedPersons: AcceptedPersonType[];
}