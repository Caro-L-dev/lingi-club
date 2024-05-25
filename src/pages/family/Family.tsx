/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormValues {
  nom: string;
  ville: string;
  region: string;
  tarif: string;
  description?: string; // Optional for Family component
}

interface FormFieldProps {
  id: keyof FormValues;
  label: string;
  register: ReturnType<typeof useForm>["register"];
}

const FormField: React.FC<FormFieldProps> = ({ id, label, register }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="text" {...register(id)} />
  </div>
);

const Family = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    // Handle form submission logic here
    // For example, you can make an API call to submit the form data

    // Display success message
    toast.success("Form submitted successfully!");
  };

  return (
    <Card>
      <CardHeader>Family</CardHeader>
      <CardContent>
        <form className="mx-auto max-w-sm" onSubmit={handleSubmit(onSubmit)}>
          <FormField id="nom" label="Name" register={register} />
          <FormField id="ville" label="City" register={register} />
          <FormField id="region" label="Region" register={register} />
          <FormField id="tarif" label="Rate per day" register={register} />
          <FormField id="description" label="Description" register={register} />
          <div>
            <Button type="submit">Validate</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Family;
