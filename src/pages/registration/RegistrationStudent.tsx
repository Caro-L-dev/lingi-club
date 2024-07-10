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
  name: z.string().nonempty("Le nom est requis"),
  region: z.string().nonempty("La région est requise"),
  city: z.string().nonempty("La ville est requise"),
});

type StudentFormData = z.infer<typeof studentFormSchema>;

const RegistrationStudent = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const methods = useForm<StudentFormData>({
    mode: "onChange",
    resolver: zodResolver(studentFormSchema),
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Votre inscription a été enregistrée avec succès !");
      console.log("Données du formulaire : ", data);

      // Redirect to home page
      navigate("/"); // Adjust this path as needed
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
            <Button
              type="submit"
              className="w-full mt-5 uppercase"
              disabled={
                !methods.formState.isValid || methods.formState.isSubmitting
              }
            >
              {methods.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Chargement...
                </>
              ) : (
                "Valider mon inscription"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationStudent;
