import { RegisterFormType } from "@/types/Forms";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type RoleSelectionProps = {
  setRole: (role: "family" | "student") => void;
  register: UseFormRegister<RegisterFormType>;
  errors: FieldErrors<RegisterFormType>;
};

const RoleSelection = ({ setRole, register, errors }: RoleSelectionProps) => {
  const getErrorMessage = (error: FieldErrors<RegisterFormType>["role"]) => {
    if (typeof error === "string") {
      return error;
    } else if (error && typeof error.message === "string") {
      return error.message;
    }
    return null;
  };

  return (
    <fieldset>
      <legend className="text-center mb-2 text-sm text-muted-foreground">
        Je souhaite m'inscrire en tant que :
      </legend>
      <div className="flex justify-center space-x-4">
        <div>
          <input
            type="radio"
            id="family"
            value="family"
            {...register("role", {
              required: "Veuillez sélectionner votre rôle.",
              onChange: (e) => setRole(e.target.value as "family" | "student"),
            })}
            className="mr-2"
          />
          <label htmlFor="family">Famille d'accueil</label>
        </div>
        <div>
          <input
            type="radio"
            id="student"
            value="student"
            {...register("role", {
              required: "Veuillez sélectionner votre rôle.",
              onChange: (e) => setRole(e.target.value as "family" | "student"),
            })}
            className="mr-2"
          />
          <label htmlFor="student">Apprenant</label>
        </div>
      </div>
      {errors.role && (
        <p className="text-destructive text-center mt-2">
          {getErrorMessage(errors.role)}
        </p>
      )}
    </fieldset>
  );
};

export default RoleSelection;