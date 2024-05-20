import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ConnexionForm from "./ConnexionForm";

// eslint-disable-next-line react-refresh/only-export-components
export const formSchema = z.object({
    email: z.string().email({ message: "email invalide" }),
    password: z.string().min(7, {
        message: "Le mot de passe contient au moins 7 caractères.",
    }),
});

type User = {
    login: string;
    userId: string;
};

const Connexion = () => {
    // 1. Define fake user
    const userFake: User = {
        login: "José",
        userId: "lilianne",
    };

    // 2. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    // 3. Define submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // A VOIR AVEC BACK
        console.log(values);
    }

    !userFake && <h2>User not connected</h2>;

    return (
        <ConnexionForm onSubmit={onSubmit} form={form} />

    );
};

export default Connexion;
