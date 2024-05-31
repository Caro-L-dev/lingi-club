import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ConnexionForm from "./ConnexionForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ConnexionNavigate from "./ConnexionNavigate";

// eslint-disable-next-line react-refresh/only-export-components
export const formSchema = z.object({
    email: z.string().email({ message: "email invalide" }),
    password: z.string().min(6, {
        message: "Le mot de passe contient au moins 6 caractères.",
    }),
});

const Connexion = () => {
    const { isUserConnected, firebaseLogIn, loading } = useAuth();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        firebaseLogIn(values);
        navigate("/");
    }

    return (
        <>
            {isUserConnected ? (
                <ConnexionNavigate />
            ) : (
                <ConnexionForm
                    onSubmit={onSubmit}
                    form={form}
                    loading={loading}
                />
            )}
        </>
    );
};

export default Connexion;
