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
    <span className="text-text flex-1">{value}</span>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden peer" // Скрываем нативный input
    />
    {/* Кастомный круг для радио-кнопки */}
    <div className="w-5 h-5 rounded-full border-2 bg-white  border-gray-400 flex items-center justify-center transition-colors peer-checked:border-accentText peer-checked:bg-white">
      {checked && (
        <div className="w-2.5 h-2.5 rounded-full bg-accentText transition-colors"></div>
      )}
    </div>
  </label>
);

export default CustomRadio;
