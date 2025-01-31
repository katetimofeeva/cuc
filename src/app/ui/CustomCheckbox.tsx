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
    <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded-full transition peer-checked:border-primary relative">
      {checked && <span className="w-3 h-3 rounded-full bg-[#4A90E2]"></span>}
    </span>
  </label>
);

export default CustomCheckbox;
