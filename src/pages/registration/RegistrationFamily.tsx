import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import FormField from "@/components/common/formField/FormField";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const RegistrationFamily = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const onSubmit = (
    //data
    ) => {
    toast.success("Votre famille a été enregistrée avec succès !");
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
              <FormField id="rate" label="Tarif/jour" />
            </fieldset>
            <fieldset>
              <FormField id="description" label="Description" />
            </fieldset>
            <Button type="submit" className="w-full mt-5 uppercase">
              Valider l'inscription de ma famille
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationFamily;