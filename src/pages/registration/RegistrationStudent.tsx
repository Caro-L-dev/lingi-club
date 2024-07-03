import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import FormField from "@/components/common/formField/FormField";
import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Définition du schéma de validation
const studentFormSchema = z.object({
  name: z.string().nonempty("Le nom est requis"),
  region: z.string().nonempty("La région est requise"),
  city: z.string().nonempty("La ville est requise"),
});

// Type dérivé du schéma
type StudentFormData = z.infer<typeof studentFormSchema>;

const RegistrationStudent = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const onSubmit = (
    //data
    ) => {
    toast.success("Votre inscription a été enregistrée avec succès !");
    navigate("/student-availability"); // Redirection vers la page suivante
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
            <Button
              type="submit"
              className="w-full mt-5 uppercase"
              disabled={
                !methods.formState.isValid || methods.formState.isSubmitting
              }
            >
              {methods.formState.isSubmitting
                ? "Chargement..."
                : "Valider mon inscription"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationStudent;
