import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ConnexionForm from "./ConnexionForm";
import ConnexionNavigate from "./ConnexionNavigate";

// eslint-disable-next-line react-refresh/only-export-components
export const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, {
    message: "Le mot de passe contient au moins 6 caractères.",
  }),
});

const Connexion = () => {
  const { isUserConnected, firebaseLogIn, loading, error } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  useEffect(() => {
    if (isUserConnected) {
      navigate("/");
    }
  }, [isUserConnected, navigate]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    firebaseLogIn(values);
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
          error={error}
        />
      )}
    </>
  );
};

export default Connexion;
