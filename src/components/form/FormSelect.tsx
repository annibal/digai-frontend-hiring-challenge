import { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface IFormSelectOption {
  label: ReactNode;
  value: string | number;
  key?: string | number | null;
  disabled?: boolean | null;
}

export interface IFormSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  options: IFormSelectOption[];
  onChange: (value: string | number) => void;
  value: string | number
}

export default function FormSelect({
  options,
  value,
  onChange,
  className,
  ...restProps
}: IFormSelectProps) {

  const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    onChange(evt.target.value);
  };

  return (
    <select
      className={twMerge(
        "py-3 pl-3 pr-8",
        "block w-full leading-tight",
        "bg-white text-gray-700",
        "border border-gray-400 focus:border-gray-500",
        "appearance-none focus:outline-none rounded",
        className
      )}
      {...restProps}
      onChange={handleChange}
      value={value}
    >
      {options.map(option => (
        <option key={option.key} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
