import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

import { RegisterFormType, RoleType } from "@/types/Forms";

// Import the RoleSelection component
import RoleSelection from "./roleselection/RoleSelection";

const Registration = () => {
  const navigate = useNavigate();
  const methods = useForm<RegisterFormType>();
  const [role, setRole] = useState<RoleType>("");
  const { firebaseRegister, loading, error } = useAuth();

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
            <RoleSelection setRole={setRole} />
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
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Chargement...
                </>
              ) : (
                "Poursuivre mon inscription"
              )}
            </Button>
            {error && <p className="text-destructive">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default Registration;
