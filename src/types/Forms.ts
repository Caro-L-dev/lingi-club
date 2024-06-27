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
