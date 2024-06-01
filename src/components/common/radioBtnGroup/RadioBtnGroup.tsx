interface RadioButtonGroupProps {
  options: Array<{ id: string; label: string; value: string }>;
  name: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  name,
  defaultValue,
  onValueChange,
}) => {
  return (
    <div className="flex items-center justify-around space-x-4">
      {options.map((option) => (
        <div key={option.id} className="flex items-center gap-2">
          <input
            type="radio"
            id={option.id}
            name={name}
            value={option.value}
            checked={defaultValue === option.value}
            onChange={() => onValueChange(option.value)}
          />
          <label htmlFor={option.id} className="uppercase">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
