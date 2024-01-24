import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input = ({ label, id, ...props }: Props) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} type="text" name={id} required />
    </p>
  );
};

export default Input;
