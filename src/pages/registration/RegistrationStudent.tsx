import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import FormField from "@/components/common/formField/FormField";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const RegistrationStudent = () => {
  const methods = useForm({
    mode: "context",
  });

  const onSubmit = (data) => {
    toast.success("Votre inscription a été enregistrée avec succès !");
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

            <Button type="submit" className="w-full mt-5 uppercase">
              Valider mon inscription
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationStudent;
