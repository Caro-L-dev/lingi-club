import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ConnexionForm from "./ConnexionForm";

// eslint-disable-next-line react-refresh/only-export-components
export const formSchema = z.object({
    username: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }),
    email: z.string().email({ message: "email invalide" }),
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
            username: "",
            email: "",
        },
    });

    // 3. Define submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    !userFake && <h2>User not connected</h2>;

    return (
        <ConnexionForm onSubmit={onSubmit} form={form} />

    );
};

export default Connexion;
