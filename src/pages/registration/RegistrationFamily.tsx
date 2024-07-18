import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addOrUpdateDataToFirebase } from "@/firebase/firestore"; // Import the function to add or update data to Firebase
import { useAuth } from "@/hooks/useAuth"; // Import the useAuth hook

const localizer = momentLocalizer(moment);

const familyFormSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, {
    message: "Le mot de passe contient au moins 6 caractères.",
  }),
  name: z.string().nonempty("Le nom est requis"),
  region: z.string().nonempty("La région est requise"),
  city: z.string().nonempty("La ville est requise"),
  dailyRate: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Le tarif journalier doit être un nombre positif",
    }),
});

type FamilyFormData = z.infer<typeof familyFormSchema>;

type Availability = {
  start: Date;
  end: Date;
};

const RegistrationFamily: React.FC = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const navigate = useNavigate();
  const { firebaseRegister, isUserConnected, loading, error } = useAuth(); // Get the required functions from useAuth

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FamilyFormData>({
    mode: "onChange",
    resolver: zodResolver(familyFormSchema),
  });

  useEffect(() => {
    if (isUserConnected) {
      navigate("/"); // Adjust this path as needed
    }
  }, [isUserConnected, navigate]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setAvailabilities([...availabilities, { start, end }]);
  };

  const onSubmit = async (data: FamilyFormData) => {
    try {
      const result = await firebaseRegister({
        email: data.email,
        password: data.password,
        isFamily: true,
        role: "family",
      });

      if (result.data) {
        const uid = result.data.uid; // Get the UID of the current user
        await addOrUpdateDataToFirebase("users", uid, {
          ...data,
          availabilities: availabilities.map(({ start, end }) => ({
            start,
            end,
          })),
        });

        toast.success("Votre inscription a été enregistrée avec succès !");
        console.log("Form data: ", { ...data, availabilities });

        navigate("/"); // Adjust this path as needed
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription.");
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
                name="name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nom" />}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                name="dailyRate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Tarif journalier"
                  />
                )}
              />
              {errors.dailyRate && (
                <p className="text-red-500 text-sm">
                  {errors.dailyRate.message}
                </p>
              )}
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
              onSelectSlot={handleSelectSlot}
              style={{ height: 500 }}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-5 uppercase"
            disabled={!isValid || isSubmitting || loading}
          >
            {loading || isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              "Valider mon inscription"
            )}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationFamily;
