import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import { z } from "zod";

import FormField from "@/components/common/formField/FormField";
import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const studentFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  region: z.string().min(1, "La région est requise"),
  city: z.string().min(1, "La ville est requise"),
});

type StudentFormData = z.infer<typeof studentFormSchema>;

const RegistrationStudent = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const methods = useForm<StudentFormData>({
    mode: "onChange",
    resolver: zodResolver(studentFormSchema),
  });

  const onSubmit = () => {
    try {
      toast.success("Votre inscription a été enregistrée avec succès !");
      navigate("/");
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <TitleCard>Apprenant</TitleCard>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <fieldset>
              <FormField id="name" label="Nom" />
            </fieldset>
            <fieldset>
              <FormField id="region" label="Région" />
              <FormField id="city" label="Ville" />
            </fieldset>
            {methods.formState.isSubmitting ? (
              <Button type="submit" className="w-full mt-5 uppercase" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mt-5 uppercase"
                disabled={
                  !methods.formState.isValid || methods.formState.isSubmitting
                }
              >
                Valider mon inscription
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationStudent;
