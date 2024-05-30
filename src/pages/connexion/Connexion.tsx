import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ConnexionForm from "./ConnexionForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// eslint-disable-next-line react-refresh/only-export-components
export const formSchema = z.object({
    email: z.string().email({ message: "email invalide" }),
    password: z.string().min(6, {
        message: "Le mot de passe contient au moins 6 caractères.",
    }),
});

const Connexion = () => {
    const { isUserConnected, logIn, loading, error } = useAuth();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        logIn(values);
    }

    isUserConnected && navigate("/");

    return <ConnexionForm onSubmit={onSubmit} form={form} loading={loading} error={error} />;
};

export default Connexion;
