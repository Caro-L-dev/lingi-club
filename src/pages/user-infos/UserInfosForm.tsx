import { useState } from "react";
import { toast } from "react-toastify";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactSelect from "react-select";
import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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

import { UserType } from "@/types/User";
import { formSchema } from "@/types/Forms";

import { regionsList, acceptedPersonList } from "@/lib/data/data";

import { uploadImageOnFirebase } from "@/firebase/firestore";

type Props = {
  onSubmit(values: z.infer<typeof formSchema>): void;
  userData: UserType;
  loading: boolean;
};

const UserInfosForm = ({ onSubmit, userData, loading }: Props) => {
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
      displayName: `${userData?.displayName}`,
      email: `${userData?.email}`,
      description: `${userData?.description}`,
      city: `${userData.city}`,
      region: `${userData?.region}`,
      familyLanguage: `${userData?.familyLanguage}`,
      familyDailyRate: userData?.familyDailyRate,
      familyAvailabilities: userData?.familyAvailabilities,
      photoUrl: `${userData?.photoUrl}`,
      studentAge: userData?.studentAge,
      familyAcceptedPersons: userData?.familyAcceptedPersons,
    },
  });

  return (
    <div className="mx-auto mt-8 max-w-[600px]">
      <Card>
        <CardHeader>
          <TitleCard>
            Mon compte{" "}
            <span className="text-secondary">
              {userData.isFamily ? "Famille d'accueil" : "Apprenant"}
            </span>
          </TitleCard>
        </CardHeader>
        {userData && (
          <Form {...form}>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entrez un e-mail valide."
                        {...field}
                      />
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
              {userData.isFamily ? (
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
                            // HTML form field values are always strings: we convert them to numbers
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : null
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
                          defaultValue={
                            field.value
                              ? field.value.map((value) => ({
                                  value,
                                  label: value,
                                }))
                              : []
                          }
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
              )}
              <FormField
                control={form.control}
                name="photoUrl"
                render={() => (
                  <FormItem>
                    <FormLabel>Nouvelle Photo</FormLabel>
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
                          <Button type="button" onClick={uploadImage}>
                            Télécharger l'image
                          </Button>
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

              <div className="flex justify-center">
                {loading ? (
                  <Button type="submit" className="w-full" disabled>
                    <Spinner />
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Modifier
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default UserInfosForm;
