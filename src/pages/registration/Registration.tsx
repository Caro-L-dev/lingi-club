import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { TypographyP } from "@/components/common/typographyP/TypographyP";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";

import { useAuth } from "@/hooks/useAuth";
import { RegisterFormType } from "@/types/Forms";
import RoleSelection from "./roleselection/RoleSelection";

import clsx from "clsx";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  role: z.enum(["family", "student"]), // Validation du role
});

const Registration = () => {
  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(formSchema),
  });
  const { firebaseRegister, loading, error } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormType) => {
    const result = await firebaseRegister({
      email: data.email,
      password: data.password,
      isFamily: data.role === "family",
      role: data.role, // Ajout de la propriété role
    });

    if (result.data) {
      navigate(`/${data.role}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto mt-8">
        <Card>
          <CardHeader>
            <TitleCard>Inscription</TitleCard>
          </CardHeader>
          <CardContent>
            {error ? (
              <TypographyP className="text-destructive">
                Une erreur d'inscription est survenue.
              </TypographyP>
            ) : (
              <legend className="text-muted-foreground text-center text-sm mb-4">
                Entrez votre email et mot de passe.
              </legend>
            )}

            <Form {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-8"
                aria-describedby="form-description"
              >
                <RoleSelection
                  setRole={(role) => methods.setValue("role", role)}
                  register={methods.register}
                  errors={methods.formState.errors}
                />
                <FormField
                  control={methods.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez un e-mail valide."
                          {...field}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="on"
                          placeholder="Entrez votre mot de passe."
                          {...field}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {loading ? (
                  <Button type="submit" className="w-full" disabled>
                    <Spinner />
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Inscription
                  </Button>
                )}
              </form>
            </Form>
            <CardFooter
              className={clsx(
                error && "text-destructive",
                "text-center text-sm text-muted-foreground mt-6 gap-x-2"
              )}
            >
              Déjà un compte ?
              <Link
                className="font-medium text-foreground hover:underline"
                to="/connexion"
              >
                Connectez-vous.
              </Link>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
};

export default Registration;
