import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

import { RegisterFormType } from "@/types/Forms";

const Registration = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterFormType>();
  const [role, setRole] = useState("");
  const { firebaseRegister, loading, error } = useAuth();

  const roleOptions = [
    {
      id: "registrationFamily",
      label: "famille d'accueil",
      value: "family",
    },
    { id: "registrationStudent", label: "apprenant", value: "student" },
  ];

  const onSubmit = async (data: RegisterFormType) => {
    if (!role) {
      toast.error("Veuillez sélectionner votre rôle.");
      return;
    }

    const result = await firebaseRegister({
      email: data.email,
      password: data.password,
      isFamily: role === "family",
    });

    result.data && navigate(`/${role}`);
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
