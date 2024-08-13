import { useState } from "react";

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Calendar, Event, momentLocalizer, SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";

import { Availability } from "@/types/User";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  addOrUpdateDataToFirebase,
  uploadImageOnFirebase,
} from "@/firebase/firestore";
import { useAuthContext } from "@/hooks/useAuthContext";
import { formSchema } from "@/types/Forms";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/Spinner";
import ReactSelect from "react-select";

import { regionsList, acceptedPersonList } from "@/lib/data/data";

type FormValues = {
  displayName: string;
  email: string;
  description: string;
  city: string;
  region: string;
  familyLanguage: string;
  familyDailyRate: number | null;
  familyAvailabilities: { start: Date; end: Date }[] | null;
  familyAcceptedPersons: string[] | null;
  photoUrl: string | null;
  studentAge?: number | null;
};

const RegistrationFamily = () => {
  const { authUserInfo } = useAuthContext();

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const uploadImage = async () => {
    setIsImageLoading(true);
    const url = await uploadImageOnFirebase(imageUpload);
    setIsImageLoading(false);
    url && form.setValue("photoUrl", url);
    toast.success("Image uploadée");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      description: "",
      city: "",
      region: "",
      familyLanguage: "",
      familyDailyRate: null,
      familyAvailabilities: [],
      familyAcceptedPersons: [],
      photoUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("data", data);

    if (authUserInfo) {
      try {
        await addOrUpdateDataToFirebase("users", authUserInfo.uid, {
          displayName: data.displayName,
          description: data.description,
          city: data.city,
          region: data.region,
          familyLanguage: data.familyLanguage,
          familyDailyRate: data.familyDailyRate,
          familyAcceptedPersons: data.familyAcceptedPersons,
          familyAvailabilities: availabilities,
          // familyAvailabilities: data.familyAvailabilities,
          photoUrl: data.photoUrl,
        });
        toast.success("Votre famille a été enregistrée avec succès !");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  console.log("availabilities", availabilities);

  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null
  );
  const [isAvailabilitySelected, setIsAvailabilitySelected] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<Availability | null>(null);

  const localizer = momentLocalizer(moment);

  /////////// A VOIR
  // Pour injecter une valeur dans le REACT HOOK FORM...https://react-hook-form.com/docs/useformcontext (?)
  // This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop.
  //const { setValue } = useFormContext();

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setAvailabilities([...availabilities, { start, end }]);
    //setValue("familyAcceptedPersons", [...availabilities, { start, end }]);
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

  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <TitleCard>Famille d'accueil</TitleCard>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="familyAcceptedPersons"
              render={({ field }) => {
                console.log("field", field.value);
                return (
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
                      onSelectEvent={handleSelectEvent}
                      style={{ height: 500 }}
                      {...field}
                    />
                    {/* {errors.availabilities && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.availabilities.message}
                    </p>
                  )} */}
                  </div>
                );
              }}
            />
            {/* <div className="mt-6">
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
            )} */}
            {/*      <Button
              type="submit"
              className="w-full mt-5 uppercase"
              // disabled={
              //   !isValid || isSubmitting || loading || !isAvailabilitySelected
              // }
            >
             {loading || isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Chargement...
                </>
              ) : (
              "Valider mon inscription"
              )} 
            </Button>*/}
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => {
                console.log("field NAME", field.value);
                return (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input placeholder="Login" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Entrez une description de vous"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez votre ville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Région</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionnez votre région" />
                    </SelectTrigger>
                    <SelectContent>
                      {regionsList.map((region, index) => {
                        if (region) {
                          return (
                            <SelectItem key={index} {...field} value={region}>
                              {region}
                            </SelectItem>
                          );
                        }
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Langue</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionnez votre langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem {...field} value="Anglais">
                        Anglais
                      </SelectItem>
                      <SelectItem {...field} value="Espagnol">
                        Espagnol
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyDailyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix journalier</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Entrez votre prix journalier"
                      {...field}
                      value={field.value || 0}
                      // HTML form field values are always strings: we convert them to numbers
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyAcceptedPersons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personnes acceptées</FormLabel>
                  <ReactSelect
                    isMulti
                    options={acceptedPersonList.map((acceptedPerson) => ({
                      value: acceptedPerson,
                      label: acceptedPerson,
                    }))}
                    onChange={(selectedOption) => {
                      return field.onChange(
                        selectedOption.map((option) => option.value)
                      );
                    }}
                    closeMenuOnSelect={false}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photoUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setImageUpload(e.target.files[0]);
                          }
                        }}
                        className="cursor-pointer"
                      />
                      {isImageLoading ? (
                        <Spinner />
                      ) : (
                        imageUpload && (
                          <Button type="button" onClick={uploadImage}>
                            Télécharger l'image
                          </Button>
                        )
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("photoUrl") && (
              <img
                src={form.watch("photoUrl") ?? ""}
                alt="Image sélectionnée"
                //style={{ width: "400px", height: "auto" }}
              />
            )}

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
