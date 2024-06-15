export type UserType = {
    uid: string;
    isFamily: boolean;
    email: string | null;
    displayName: string | null;
    emailVerified: boolean;
    photoUrl: string | null;
    creationDate: Date | null;
}