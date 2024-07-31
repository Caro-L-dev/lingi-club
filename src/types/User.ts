// types/User.ts
export type Availability = {
  start: Date;
  end: Date;
};

export type RegionType =
  | "Auvergne-Rhône-Alpes"
  | "Bourgogne-Franche-Comté"
  | "Bretagne"
  | "Centre-Val de Loire"
  | "Corse"
  | "Grand Est"
  | "Hauts-de-France"
  | "Île-de-France"
  | "Normandie"
  | "Nouvelle-Aquitaine"
  | "Occitanie"
  | "Pays de la Loire"
  | "Provence-Alpes-Côte d'Azur"
  | null;

export type UserType = {
<<<<<<< HEAD
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
  familyDailyRate: number | null;
  familyLanguage: string | null;
  familyAvailabilities: Availability[] | null;
};
=======
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
}
>>>>>>> c06d7a8010ad17037e251c0be31d934cbf13fd70
