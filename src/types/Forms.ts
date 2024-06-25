export type FormType = {
    email: string;
    password: string;
}

export type RegisterFormType = FormType & {
    isFamily: boolean;
}

export type LogInFormType = FormType