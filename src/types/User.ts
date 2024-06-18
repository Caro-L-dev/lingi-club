type Availability = {
  start: Date;
  end: Date;
}

export type UserType = {
    uid: string;
    isFamily: boolean;
    email: string | null;
    displayName: string | null;
    city: string | null;
    region: string | null;
    description: string | null;
    emailVerified: boolean;
    photoUrl: string | null;
    creationDate: Date | null;
    studentAge: string | null;
    familyDalyRate: number | null;
    familyLangages: string | null;
    familyAvailabilities: Availability[] | null;
}