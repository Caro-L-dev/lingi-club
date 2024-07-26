import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, Event, momentLocalizer, SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  addOrUpdateDataToFirebase,
  getDataFromFirebase,
  uploadImageOnFirebase,
} from "@/firebase/firestore";

import { useAuthContext } from "@/hooks/useAuthContext";
import { Availability, UserType } from "@/types/User";

const localizer = momentLocalizer(moment);

const familyFormSchema = z.object({
  displayName: z.string().min(1, { message: "Le nom est requis" }),
  region: z.string().min(1, { message: "La région est requise" }),
  city: z.string().min(1, { message: "La ville est requise" }),
  familyDalyRate: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Le tarif journalier doit être un nombre positif",
    }),
});

type FamilyFormData = z.infer<typeof familyFormSchema>;

type UserData = Omit<UserType, "uid" | "isFamily" | "emailVerified">;

const RegistrationFamily: React.FC = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Availability | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const { authUserInfo, authUserIsLoading } = useAuthContext();

  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null
  );
  const [isAvailabilitySelected, setIsAvailabilitySelected] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FamilyFormData>({
    mode: "onChange",
    resolver: zodResolver(familyFormSchema),
    defaultValues: {
      displayName: "",
      region: "",
      city: "",
      familyDalyRate: "",
    },
  });

  useEffect(() => {
    if (!authUserIsLoading && authUserInfo) {
      navigate("/family");
    }
  }, [authUserIsLoading, authUserInfo, navigate]);

  useEffect(() => {
    setIsAvailabilitySelected(availabilities.length > 0);
  }, [availabilities]);

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setAvailabilities([...availabilities, { start, end }]);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event as Availability);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setAvailabilities(
        availabilities.filter((event) => event !== selectedEvent)
      );
      setSelectedEvent(null);
    }
  };

  const fetchUserData = async (uid: string) => {
    const response = await getDataFromFirebase("users", uid);
    if ("data" in response) {
      setUserData(response.data as UserData);
    } else {
      console.error(response.error);
    }
  };

  const onSubmit = async (data: FamilyFormData) => {
    if (availabilities.length === 0) {
      setAvailabilityError("Veuillez sélectionner au moins une disponibilité.");
      toast.error("Veuillez sélectionner au moins une disponibilité.");
      return;
    } else {
      setAvailabilityError(null);
    }

    let photoUrl: string = "";
    if (imageUpload) {
      const uploadedPhotoUrl = await uploadImageOnFirebase(imageUpload);
      photoUrl = uploadedPhotoUrl ?? "";
    }

    const uid = authUserInfo?.uid ?? "";
    const response = await addOrUpdateDataToFirebase("users", uid, {
      ...data,
      availabilities: availabilities.map(({ start, end }) => ({
        start: start.toISOString(),
        end: end.toISOString(),
      })),
      photoUrl,
    });

    if ("data" in response) {
      toast.success("Votre inscription a été enregistrée avec succès !");
      console.log("Form data: ", { ...data, availabilities, photoUrl });

      // Fetch user data to verify it has been saved correctly
      await fetchUserData(uid);

      // Wait for 5 seconds before redirecting
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      toast.error(
        "Une erreur est survenue lors de l'inscription : " + response.error
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <TitleCard>Famille d'accueil</TitleCard>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Controller
                name="displayName"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nom" />}
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm">
                  {errors.displayName.message}
                </p>
              )}
            </div>
            <div>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Région" />
                )}
              />
              {errors.region && (
                <p className="text-red-500 text-sm">{errors.region.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="city"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Ville" />}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="familyDalyRate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Tarif journalier"
                  />
                )}
              />
              {errors.familyDalyRate && (
                <p className="text-red-500 text-sm">
                  {errors.familyDalyRate.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="file"
                onChange={(event) =>
                  event.target.files && setImageUpload(event.target.files[0])
                }
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Sélectionnez vos disponibilités
            </h3>
            <Calendar
              localizer={localizer}
              events={availabilities}
              startAccessor="start"
              endAccessor="end"
              selectable
              views={["month", "week", "agenda"]}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              style={{ height: 500 }}
            />
            {availabilityError && (
              <p className="text-red-500 text-sm mt-2">{availabilityError}</p>
            )}
          </div>
          {selectedEvent && (
            <div className="mt-4">
              <Button
                type="button"
                className="w-full bg-red-500 hover:bg-red-700"
                onClick={handleDeleteEvent}
              >
                Supprimer la disponibilité
              </Button>
            </div>
          )}
          <Button
            type="submit"
            className="w-full mt-5 uppercase"
            disabled={!isValid || isSubmitting || !isAvailabilitySelected}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              "Valider mon inscription"
            )}
          </Button>
        </form>
        {userData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Données utilisateur</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationFamily;
