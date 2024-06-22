"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import RadioButtonGroup from "@/components/common/radioBtnGroup/RadioBtnGroup";
import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth"; // Use your custom hook
import { RegisterWithRoleFormType } from "@/types/Forms";

const FormSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, { message: "Mot de passe trop court" }),
  role: z.string().nonempty({ message: "Veuillez sélectionner votre rôle." }),
});

const Registration = () => {
  const navigate = useNavigate();

  // Create and configure form using react-hook-form and Zod validation schema
  const methods = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [role, setRole] = useState<string>("");
  const { firebaseRegister, loading, error } = useAuth();

  const roleOptions = [
    { id: "registrationFamily", label: "famille d'accueil", value: "family" },
    { id: "registrationStudent", label: "apprenant", value: "student" },
  ];

  const onSubmit: SubmitHandler<RegisterWithRoleFormType> = async (data) => {
    if (!role) {
      toast.error("Veuillez sélectionner votre rôle.");
      console.error("Role non sélectionné");
      return;
    }

    console.log("Tentative d'inscription avec :", data);

    const result = await firebaseRegister({
      email: data.email,
      password: data.password,
    });

    if (result.data) {
      toast.success("Inscription réussie !");
      console.log("Inscription réussie pour :", data.email);
      if (role === "family") {
        navigate("/family-availability");
        console.log("Redirection vers /family-availability");
      } else if (role === "student") {
        navigate("/student-availability");
        console.log("Redirection vers /student-availability");
      }
    } else {
      toast.error("Échec de l'inscription. Veuillez réessayer.");
      console.error("Erreur lors de l'inscription :", result.error);
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
            <fieldset>
              <legend className="text-center mb-2 text-sm text-muted-foreground">
                Je souhaite m'inscrire en tant que :
              </legend>
              <RadioButtonGroup
                options={roleOptions}
                name="role"
                defaultValue={role}
                onValueChange={(value) => setRole(value)}
              />
            </fieldset>
            <fieldset>
              <legend className="text-center mb-2 text-sm text-muted-foreground">
                Je crée mon compte :
              </legend>
              <div>
                <Label htmlFor="email" aria-label="Votre adresse e-mail">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...methods.register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
              <div>
                <Label htmlFor="password" aria-label="Votre mot de passe">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="on"
                  {...methods.register("password", { required: true })}
                />
              </div>
            </fieldset>
            <Button
              type="submit"
              aria-label="Soumettre le formulaire"
              className="w-full uppercase"
              disabled={loading}
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

export default Registration;
