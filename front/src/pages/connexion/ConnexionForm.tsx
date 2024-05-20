/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { formSchema } from "./Connexion";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

type Props = {
    onSubmit(values: z.infer<typeof formSchema>): void;
    form: UseFormReturn<
        {
            username: string;
            email: string;
        },
        any,
        undefined
    >;
};

const ConnexionForm = ({onSubmit, form}: Props) => {
    
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Bienvenu !</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Entrez votre email et mot de passe
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Login</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez votre login"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez un e-mail valide"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Connexion
                        </Button>
                    </form>
                </Form>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Pas encore de compte?
                    <Link
                        className="font-medium text-gray-900 hover:underline dark:text-gray-200 pl-2"
                        to="#"
                    >
                        Inscrivez-vous
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConnexionForm;
