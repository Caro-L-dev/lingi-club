import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import FormField from "@/components/common/formField/FormField";
import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Définition du schéma de validation
const familyFormSchema = z.object({
  name: z.string().nonempty("Le nom est requis"),
  region: z.string().nonempty("La région est requise"),
  city: z.string().nonempty("La ville est requise"),
  rate: z
    .string()
    .nonempty("Le tarif est requis")
    .transform(Number)
    .refine((n) => n > 0, "Le tarif doit être supérieur à 0"),
  description: z.string().optional(),
});

// Type dérivé du schéma
type FamilyFormData = z.infer<typeof familyFormSchema>;

const RegistrationFamily = () => {
  const navigate = useNavigate();
  const methods = useForm<FamilyFormData>({
    resolver: zodResolver(familyFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FamilyFormData) => {
    console.log(data); // Pour le débogage
    // Ici, vous enverriez normalement les données à votre backend
    toast.success("Votre famille a été enregistrée avec succès !");
    navigate("/family-availability"); // Redirection vers la page suivante
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <TitleCard>Famille d'accueil</TitleCard>
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
            <fieldset>
              <FormField id="rate" label="Tarif/jour" type="number" />
            </fieldset>
            <fieldset>
              <FormField id="description" label="Description" />
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
                : "Poursuivre mon inscription"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationFamily;
