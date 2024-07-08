import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import FormField from "@/components/common/formField/FormField";
import { WrapperForm } from "@/components/common/wrapper/WrapperForm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Spinner from "@/components/ui/Spinner";

import { useAuth } from "@/hooks/useAuth";

const RegistrationStudent = () => {
  const { loading } = useAuth();
  const methods = useForm({
    mode: "onChange",
  });

  const onSubmit = () =>
    //data
    {
      toast.success("Votre inscription a été enregistrée avec succès !");
    };

  return (
    <WrapperForm className="lg:mt-20">
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

              {loading ? (
                <Button type="submit" className="w-full" disabled>
                  <Spinner />
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Valider mon inscription
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    </WrapperForm>
  );
};

export default RegistrationStudent;
