import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ConnexionForm from "./ConnexionForm";
import { useLogIn } from "@/api/authentification";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const formSchema = z.object({
    email: z.string().email({ message: "email invalide" }),
    password: z.string().min(6, {
        message: "Le mot de passe contient au moins 7 caractères.",
    }),
});

const Connexion = () => {
    const { userAuth, logIn, loading, error } = useLogIn();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        logIn(values.email, values.password);
    }

    userAuth && navigate("/");

    return <ConnexionForm onSubmit={onSubmit} form={form} loading={loading} error={error} />;
};

export default Connexion;
