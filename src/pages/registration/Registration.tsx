import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import RadioButtonGroup from "@/components/common/radioBtnGroup/RadioBtnGroup";
import { TitleCard } from "@/components/common/titleCard/TitleCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/useAuth";

import { RegisterFormType } from "@/types/Forms";

const Registration = () => {
  const navigate = useNavigate();
  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm<RegisterFormType>();

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

    result.data && navigate("/registration-details");
  };

  return (
      <Card>
          <CardHeader>
              <TitleCard>Inscription</TitleCard>
          </CardHeader>
          <CardContent>
              <form
                  role="form"
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
              >
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
                          <Label
                              htmlFor="email"
                              aria-label="Votre adresse e-mail"
                          >
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
                          {errors.email && <span>Email non valide</span>}
                      </div>
                      <div>
                          <Label
                              htmlFor="password"
                              aria-label="Votre mot de passe"
                          >
                              Mot de passe
                          </Label>
                          <Input
                              id="password"
                              type="password"
                              autoComplete="on"
                              {...register("password", { required: true })}
                          />
                          {errors.password && <span>Mot de passe non valide</span>}
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
                  {error && <p className="text-destructive">{error}</p>}{" "}
              </form>
          </CardContent>
      </Card>
  );
};

export default Registration;
