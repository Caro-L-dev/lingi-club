import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TitleCard } from "@/components/common/titleCard/TitleCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import {
  addOrUpdateDataToFirebase,
  uploadImageOnFirebase,
} from "@/firebase/firestore";
import { useAuthContext } from "@/hooks/useAuthContext";
import { UserType } from "@/types/User";
import { formSchema } from "@/types/Forms";

import {
  Form,
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

const RegistrationFamily = () => {
  const { authUserInfo } = useAuthContext();

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

  const onSubmit = async (data) => {
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
        });
        toast.success("Votre famille a été enregistrée avec succès !");
        console.log("data", data);
      } catch (error) {
        console.error(error);
      }
    }
    // {
    //   toast.success("V}otre famille a été enregistrée avec succès !");
    // }
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
                      console.log("Selected Option:", selectedOption);
                      return field.onChange(
                        selectedOption.map((option) => option.value)
                      );
                    }}
                    // defaultValue={field.value.map((value) => ({
                    //   value,
                    //   label: value,
                    // }))}
                    closeMenuOnSelect={false}
                  />
                </FormItem>
              )}
            />
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
