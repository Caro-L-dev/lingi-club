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

export type User = {
    login: string;
    userId: string;
};

const Connexion = ({ userId }: User) => {

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

    return (
        <>
            {userId === "myid" ? (
                <h2>User connected</h2>
            ) : (
                <ConnexionForm onSubmit={onSubmit} form={form} />
            )}
        </>
    );
};

export default Connexion;
