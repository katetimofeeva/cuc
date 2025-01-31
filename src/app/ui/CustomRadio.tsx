const CustomRadio = ({
  name,
  value,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
    <span className="text-text">{value}</span>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-primary focus:ring-primary ml-2"
    />
  </label>
);

export default CustomRadio;
