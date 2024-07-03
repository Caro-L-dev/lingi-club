import moment from "moment";
import { useContext, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

import FormField from "@/components/common/formField/FormField";
import { TitleCard } from "@/components/common/titleCard/TitleCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { AuthContext } from "@/contexts/AuthUserContext";
import {
  addOrUpdateDataToFirebase,
  getDataFromFirebase,
} from "@/firebase/firestore";

const localizer = momentLocalizer(moment);

type Availability = {
  start: Date;
  end: Date;
  title: string;
};

const RegistrationFamily = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const { authUserInfo, authUserIsLoading } = useContext(AuthContext);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("Entrez un titre pour votre disponibilité");
    if (title) {
      setAvailabilities([...availabilities, { start, end, title }]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (authUserIsLoading) {
      toast.info(
        "Veuillez patienter pendant que nous vérifions votre connexion..."
      );
      return;
    }

    if (!authUserInfo || !authUserInfo.uid) {
      toast.error("Vous devez être connecté pour enregistrer une famille.");
      return;
    }

    try {
      const { displayName, region, city, dailyRate } = data;
      await addOrUpdateDataToFirebase("users", authUserInfo.uid, {
        displayName,
        region,
        city,
        dailyRate: Number(dailyRate),
        familyAvailabilities: availabilities,
      });

      toast.success("Votre famille a été enregistrée avec succès !");

      const userData = await getDataFromFirebase("users", authUserInfo.uid);
      console.log("Données enregistrées :", userData);
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'enregistrement.");
      console.error("Error writing document: ", error);
    }
  };

  if (authUserIsLoading) {
    return <div>Chargement...</div>;
  }

  if (!authUserInfo) {
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  }

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <TitleCard>Famille d'accueil</TitleCard>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <fieldset>
              <FormField id="displayName" label="Nom" />
            </fieldset>
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField id="region" label="Région" />
              <FormField id="city" label="Ville" />
            </fieldset>
            <fieldset>
              <FormField
                id="dailyRate"
                label="Tarif journalier"
                inputProps={{ type: "number" }}
              />
            </fieldset>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Sélectionnez vos disponibilités
              </h3>
              <Calendar
                localizer={localizer}
                events={availabilities}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                className="h-[500px]"
              />
            </div>
            <Button type="submit" className="w-full uppercase">
              Valider l'inscription de ma famille
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationFamily;