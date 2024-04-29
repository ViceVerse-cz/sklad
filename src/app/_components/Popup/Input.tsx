interface Props {
  type: "text" | "password" | "email" | "number" | "date";
  label: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, label, defaultValue, onChange }: Props) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-600  mb-1 block text-sm">{label}</label>}
      <input
        type={type}
        className="border rounded border-gray-300 p-2 w-full hover:border-blue-400 focus:border-blue-400 focus:outline-none"
        placeholder={label}
        onInput={onChange}
        value={defaultValue}
      />
    </div>
  );
};

export default Input;
