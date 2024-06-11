import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import RadioButtonGroup from "@/components/common/radioBtnGroup/RadioBtnGroup";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Registration = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [role, setRole] = useState("");

  const roleOptions = [
    {
      id: "registrationFamily",
      label: "famille d'accueil",
      value: "family",
    },
    { id: "registrationStudent", label: "apprenant", value: "student" },
  ];

  const onSubmit = (data) => {
    if (!role) {
      toast.error("Veuillez sélectionner votre rôle.");
      return;
    }

    toast.success("Formulaire 1/2 validé.");
    setTimeout(() => {
      navigate(`/${role}`);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <TitleCard>Inscription</TitleCard>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", {
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
                {...register("password", { required: true })}
              />
            </div>
          </fieldset>
          <Button
            type="submit"
            aria-label="Soumettre le formulaire"
            className="w-full uppercase"
          >
            Poursuivre mon inscription
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default Registration;
