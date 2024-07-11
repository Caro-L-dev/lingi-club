import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/Spinner";
import { Textarea } from "@/components/ui/textarea";
import { regionsList } from "@/lib/data/data";
import { formSchema } from "@/types/Forms";
import { UserType } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  onSubmit(values: z.infer<typeof formSchema>): void;
  userData: UserType;
  loading: boolean;
};

const FamillyInfosForm = ({ onSubmit, userData, loading }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: `${userData?.displayName}`,
      email: `${userData?.email}`,
      description: `${userData?.description}`,
      city: `${userData.city}`,
      region: `${userData?.region}`,
      familyLangages: `${userData?.familyLangages}`,
      photoUrl: `${userData?.photoUrl}`,
      studentAge: `${userData?.studentAge}`,
    },
  });

  return (
    <div className="mx-auto mt-8 max-w-[600px]">
      <Card>
        <CardHeader>
          <TitleCard>Mon compte</TitleCard>
          <CardDescription className="text-center">
            Famille d'accueil
          </CardDescription>
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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectionnez votre région" />
                      </SelectTrigger>
                      <SelectContent>
                        {regionsList.map((region, index) => {
                          if (region) {
                            return (
                              <SelectItem {...field} value={region} key={index}>
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
                name="familyLangages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Langue</FormLabel>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectionnez votre langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem {...field}>Anglais</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

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

export default FamillyInfosForm;
