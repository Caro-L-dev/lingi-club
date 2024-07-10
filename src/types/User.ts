type Availability = {
  start: Date;
  end: Date;
}

export type RegionType = "Auvergne-Rhône-Alpes" | "Bourgogne-Franche-Comté" | "Bretagne" | "Centre-Val de Loire" | "Corse" | "Grand Est" | "Hauts-de-France" | "Île-de-France" | "Normandie" | "Nouvelle-Aquitaine" | "Occitanie" | "Pays de la Loire" | "Provence-Alpes-Côte d'Azur" | null

export type UserType = {
    uid: string;
    isFamily: boolean;
    email: string | null;
    displayName: string | null;
    city: string | null;
    region: RegionType;
    description: string | null;
    emailVerified: boolean;
    photoUrl: string | null;
    creationDate: Date | null;
    studentAge: number | null;
    familyDalyRate: number | null;
    familyLangages: string | null;
    familyAvailabilities: Availability[] | null;
}