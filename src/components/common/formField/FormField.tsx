import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  inputProps = {},
}) => {
  const { register } = useFormContext();

  return (
    <div className="mb-4">
      <Label htmlFor={id} aria-label={label}>
        {label}
      </Label>
      <Input
        id={id}
        {...register(id)}
        {...inputProps}
        className="form-control"
      />
    </div>
  );
};

export default FormField;
