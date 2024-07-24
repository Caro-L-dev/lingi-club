import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { RegisterFormType } from "@/types/Forms";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Registration.css";
import RoleSelection from "./roleselection/RoleSelection";

const Registration = () => {
  const navigate = useNavigate();
  const methods = useForm<RegisterFormType>({
    mode: "onChange",
  });
  const { register, handleSubmit, setValue } = methods;
  const { firebaseRegister, loading, error } = useAuth();

  const onSubmit = async (data: RegisterFormType) => {
    if (!data.role) {
      toast.error("Veuillez sélectionner votre rôle.");
      return;
    }

    const result = await firebaseRegister({
      email: data.email,
      password: data.password,
      isFamily: data.role === "family",
      role: data.role,
    });

    if (result.data) {
      if (data.role === "family") {
        navigate("/family");
      } else if (data.role === "student") {
        navigate("/student");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="responsive-card">
        <CardHeader>
          <TitleCard>Inscription</TitleCard>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-destructive text-center mb-4">{error}</p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <RoleSelection
              setRole={(role) => setValue("role", role)}
              register={register}
              errors={methods.formState.errors}
            />
            <fieldset>
              <legend className="text-center mb-2 text-sm text-muted-foreground">
                Je crée mon compte :
              </legend>
              <div>
                <Label htmlFor="email" aria-label="Votre adresse e-mail">
                  Email
                </Label>
                <Input id="email" type="email" {...register("email")} />
              </div>
              <div>
                <Label htmlFor="password" aria-label="Votre mot de passe">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="on"
                  {...register("password")}
                />
              </div>
            </fieldset>
            {loading ? (
              <Button type="submit" className="w-full" disabled>
                <Spinner />
              </Button>
            ) : (
              <Button
                type="submit"
                aria-label="Soumettre le formulaire"
                className="w-full uppercase"
                disabled={!methods.formState.isValid}
              >
                Poursuivre mon inscription
              </Button>
            )}
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground mt-6 gap-x-2">
          Déjà inscrit ?
          <Link
            className="font-medium text-foreground hover:underline"
            to="/connexion"
          >
            Connectez-vous.
          </Link>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default Registration;
