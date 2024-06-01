import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormValues {
  name: string;
  region: string;
  city: string;
  rate: string;
  description?: string;
}

interface FormFieldProps {
  id: keyof FormValues;
  label: string;
  register: ReturnType<typeof useForm>["register"];
}

const FormField: React.FC<FormFieldProps> = ({ id, label, register }) => (
  <div className="mb-4">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="text" {...register(id)} />
  </div>
);

const RegistrationFamily = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    toast.success("Votre famille a été enregistrée avec succès !");
  };

  return (
    <Card>
      <CardHeader className="text-center uppercase text-2xl font-bold mb-4">
        Famille d'accueil
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField id="name" label="Nom" register={register} />
          <FormField id="region" label="Région" register={register} />
          <FormField id="city" label="Ville" register={register} />
          <FormField id="rate" label="Tarif/jour" register={register} />
          <FormField id="description" label="Description" register={register} />
          <Button type="submit" className="w-full mt-5">
            Valider l'inscription de ma famille
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationFamily;
