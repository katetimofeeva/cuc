const CustomCheckbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => (
  <label className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
    <span className="text-text">{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="hidden peer"
    />
    <span className="w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-full transition peer-checked:border-accentText relative">
      {checked && (
        <span className="w-2.5 h-2.5 rounded-full bg-accentText"></span>
      )}
    </span>
  </label>
);

export default CustomCheckbox;
