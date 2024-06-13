import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { RegisterWithRoleFormType } from "@/types/Forms";

// Updated validation schema to include the 'role' field
const FormSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, { message: "Mot de passe trop court" }),
  role: z.string().nonempty({ message: "Veuillez sélectionner votre rôle." }),
});

const Registration = () => {
  const navigate = useNavigate();
  const { firebaseRegister, loading, error } = useAuth();

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onChange", // Real-time validation
  });

  // Use useWatch to monitor the 'role' field
  const watchedRole = useWatch({ control: methods.control, name: "role" });
  console.log("Current role:", watchedRole); // For debugging

  const onSubmit: SubmitHandler<RegisterWithRoleFormType> = async (data) => {
    try {
      const result = await firebaseRegister({
        email: data.email,
        password: data.password,
      });

      if (result.data) {
        toast.success("Inscription réussie !");
        // Redirect to the intermediate form based on the role
        if (data.role === "family") {
          navigate("/family");
        } else if (data.role === "student") {
          navigate("/student");
        }
      } else {
        toast.error(`Échec de l'inscription : ${result.error}`);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <TitleCard>Inscription</TitleCard>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
            <RoleSelection />
            <fieldset>
              <legend className="text-center mb-2 text-sm text-muted-foreground">
                Je crée mon compte :
              </legend>
              <div>
                <Label htmlFor="email" aria-label="Votre adresse e-mail">
                  Email
                </Label>
                <Input id="email" type="email" {...methods.register("email")} />
              </div>
              <div>
                <Label htmlFor="password" aria-label="Votre mot de passe">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="on"
                  {...methods.register("password")}
                />
              </div>
            </fieldset>
            <Button
              type="submit"
              aria-label="Soumettre le formulaire"
              className="w-full uppercase"
              disabled={loading || !methods.formState.isValid}
            >
              {loading ? "Chargement..." : "Poursuivre mon inscription"}
            </Button>
            {error && <p className="text-destructive">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

// Component for role selection
const RoleSelection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
            })}
            className="mr-2"
          />
          <label htmlFor="student">Apprenant</label>
        </div>
      </div>
      {errors.role && (
        <p className="text-destructive text-center mt-2">
          {errors.role.message}
        </p>
      )}
    </fieldset>
  );
};

export default Registration;
