import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FormField: React.FC<FormFieldProps> = ({ id, label }) => {
  const { register } = useFormContext();

  return (
    <div className="mb-4">
      <Label htmlFor={id} aria-label={label}>
        {label}
      </Label>
      <Input id={id} type="text" {...register(id)} />
    </div>
  );
};

export default FormField;
