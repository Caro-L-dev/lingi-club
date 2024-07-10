import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
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

const localizer = momentLocalizer(moment);

const familyFormSchema = z.object({
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
  title: string;
};

const RegistrationFamily: React.FC = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FamilyFormData>({
    mode: "onChange",
    resolver: zodResolver(familyFormSchema),
  });

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("Entrez un titre pour votre disponibilité");
    if (title) {
      setAvailabilities([...availabilities, { start, end, title }]);
    }
  };

  const onSubmit = async (data: FamilyFormData) => {
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      toast.success("Votre inscription a été enregistrée avec succès !");
      console.log("Form data: ", { ...data, availabilities });

      // Redirect to home page
      navigate("/"); // Adjust this path as needed
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
            disabled={!isValid || isSubmitting}
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
      </CardContent>
    </Card>
  );
};

export default RegistrationFamily;
