import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TitleCard } from "@/components/common/titleCard/TitleCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import {
  addOrUpdateDataToFirebase,
  getDataFromFirebase,
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
import { useNavigate } from "react-router";

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

const RegistrationDetails = () => {
  const { authUserInfo } = useAuthContext();

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isFamily, setIsFamily] = useState(null);

  const navigate = useNavigate();

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
      familyLanguage: "Anglais",
      familyDailyRate: null,
      familyAvailabilities: [],
      familyAcceptedPersons: [],
      photoUrl: "",
      studentAge: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
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
          photoUrl: data.photoUrl,
          studentAge: data.studentAge,
        });
        toast.success("Votre compte a été enregistrée avec succès !");
        navigate("/");
      } catch (error) {
        toast.error("Erreur lors de l'enregistrement de votre compte");
      }
    }
  };

  useEffect(() => {
    if (authUserInfo) {
      getDataFromFirebase("users", authUserInfo.uid)
        .then((response) => response.data)
        .then((userData) => {
          setIsFamily(userData?.isFamily);
        });
    }
  }, [authUserInfo]);

  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <TitleCard>
            Inscription{" "}
            <span className="text-secondary">
              {isFamily ? "Famille d'accueil" : "Apprenant"}
            </span>
          </TitleCard>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="Login" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
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
            {isFamily ? (
              <>
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
              </>
            ) : (
              <FormField
                control={form.control}
                name="studentAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Entrez votre âge"
                        {...field}
                        value={field.value || 0}
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
            )}
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
              />
            )}

            <Button type="submit" className="w-full mt-5 uppercase">
              Valider mon inscription
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default RegistrationDetails;
