import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  city: string;
  region: string;
  rate: string;
}

interface FormFieldProps {
  id: keyof FormValues;
  label: string;
  register: ReturnType<typeof useForm>["register"];
}

const FormField: React.FC<FormFieldProps> = ({ id, label, register }) => (
  <div className="mb-4">
    <Label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </Label>
    <Input
      id={id}
      type="text"
      className="w-full px-3 py-2 border rounded-md shadow-sm"
      {...register(id)}
    />
  </div>
);

const RegistrationStudent = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    toast.success("Form submitted successfully!");
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader className="text-center text-2xl font-bold mb-4">
        Etudiant
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField id="name" label="Nom" register={register} />
          <FormField id="city" label="Ville" register={register} />
          <FormField id="region" label="Région" register={register} />
          <FormField id="rate" label="Tarif/jour" register={register} />
          <div className="text-center mt-6">
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Valider
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationStudent;
