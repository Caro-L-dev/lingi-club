export type FormType = {
    email: string;
    password: string;
}

export type RegisterFormType = FormType;
export type LogInFormType = FormType;

export type RegisterWithRoleFormType = FormType & {
    role: string;
}
