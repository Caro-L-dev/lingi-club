import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import RadioButtonGroup from "@/components/common/radioBtnGroup/RadioBtnGroup";
import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { WrapperForm } from "@/components/common/wrapper/WrapperForm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/useAuth";

import { RegisterWithRoleFormType } from "@/types/Forms";
import Spinner from "@/components/ui/Spinner";

const Registration = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<RegisterWithRoleFormType>();
  const [role, setRole] = useState("");
  const { firebaseRegister, loading } = useAuth();

  const roleOptions = [
    {
      id: "registrationFamily",
      label: "famille d'accueil",
      value: "family",
    },
    { id: "registrationStudent", label: "apprenant", value: "student" },
  ];

  const onSubmit = async (data: RegisterWithRoleFormType) => {
    if (!role) {
      toast.error("Veuillez sélectionner votre rôle.");
      return;
    }

    const result = await firebaseRegister({
      email: data.email,
      password: data.password,
    });

    result.data && navigate(`/${role}`);
  };

  return (
    <WrapperForm className="lg:mt-20">
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
            {loading ? (
              <Button type="submit" className="w-full" disabled>
                <Spinner />
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Connexion
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </WrapperForm>
  );
};

export default Registration;
