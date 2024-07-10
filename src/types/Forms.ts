export type FormType = {
  email: string;
  password: string;
  isFamily: boolean;
};

export type RoleType = "family" | "apprenant" | null;

export type RegisterFormType = {
  email: string;
  password: string;
  role: RoleType;
};

export type FormValuesType = {
  language: string;
  region: string;
};

export type LogInFormType = FormType;
