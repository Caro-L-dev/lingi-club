import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, useForm } from "react-hook-form";

interface FormValues {
  nom: string;
  ville: string;
  region: string;
  tarif: string;
}

interface FormFieldProps {
  id: keyof FormValues;
  label: string;
  register: UseFormRegister<FormValues>;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, register }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="text" {...register(id)} />
  </div>
);

const Student = () => {
  const { register } = useForm<FormValues>();
  return (
    <Card>
      <CardHeader>Student</CardHeader>
      <CardContent>
        <form className="mx-auto max-w-sm">
          <FormField id="nom" label="Name" register={register} />
          {/* Add more form fields as needed */}
          <FormField id="ville" label="City" register={register} />
          <FormField id="region" label="Region" register={register} />
          <FormField id="tarif" label="Rate per day" register={register} />
          <div>
            <Button type="submit">Validate</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Student;
