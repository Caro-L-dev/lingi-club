import { Link } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

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

import { formSchema } from "./Connexion";

import clsx from "clsx";

type Props = {
    onSubmit(values: z.infer<typeof formSchema>): void;
    form: UseFormReturn<{
        password: string;
        email: string;
    }>;
    loading: boolean;
    error?: string | null;
};

const ConnexionForm = ({ onSubmit, form, loading, error }: Props) => {
    return (
        <div className="mx-auto mt-8">
            <Card>
                <CardHeader>
                    <TitleCard>Bienvenue !</TitleCard>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <TypographyP className="text-destructive">
                            Une erreur de connexion est survenue.
                        </TypographyP>
                    ) : (
                        <legend className="text-muted-foreground text-center text-sm mb-4">
                            Entrez votre email et mot de passe.
                        </legend>
                    )}

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                            aria-describedby="form-description"
                        >
                            <FormField
                                control={form.control}
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
                                control={form.control}
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
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled
                                >
                                    <Spinner />
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full">
                                    Connexion
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
                        Pas encore de compte ?
                        <Link
                            className="font-medium text-foreground hover:underline"
                            to="/registration"
                        >
                            Inscrivez-vous.
                        </Link>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    );
};

export default ConnexionForm;
