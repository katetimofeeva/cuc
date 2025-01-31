import React, { Dispatch, SetStateAction } from "react";
import CustomCheckbox from "./CustomCheckbox";
import CustomRadio from "./CustomRadio";

interface IPriceForm {
  selectedTypeFurniture: string;
  selectFurniture: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  options: string[];
  selectedOption: string;
  handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  includeStainRemoval: boolean;
  setIncludeStainRemoval: Dispatch<SetStateAction<boolean>>;
  finalPrice: number;
  furniture: string[];
  id: string;
}
const PriceForm = ({
  selectedTypeFurniture,
  selectFurniture,
  setIsOpen,
  isOpen,
  options,
  selectedOption,
  handleOptionChange,
  includeStainRemoval,
  setIncludeStainRemoval,
  finalPrice,
  furniture,
  id,
}: IPriceForm) => {
  return (
    <div
      className="w-full"
      id={id}
    >
      <form className="flex flex-col space-y-4">
        <h3 className="font-semibold text-text text-center sm:text-lg">
          {`Choose the ${id} cleaning service you need`}
        </h3>
        <div className="relative  text-accentText  md:text-xl ">
          <select
            value={selectedTypeFurniture}
            onChange={selectFurniture}
            onFocus={() => setIsOpen(true)}
            onMouseDown={() => setIsOpen(prev => !prev)}
            onBlur={() => setIsOpen(false)}
            className="w-full  appearance-none p-3 border font-bold rounded-lg shadow-sm focus:ring-2  bg-gray-100 hover:bg-background transition"
          >
            {furniture.map(type => (
              <option
                key={type}
                value={type}
                className="md:text-xl mb-1"
              >
                {type}
              </option>
            ))}
          </select>
          <span
            className={`absolute right-4 top-1/2 transform -translate-y-1/2  ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            &#x25BC;
          </span>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            {options.map(name => (
              <CustomRadio
                key={name}
                name={id}
                value={name}
                checked={selectedOption === name}
                onChange={handleOptionChange}
              />
            ))}
            <CustomCheckbox
              checked={includeStainRemoval}
              onChange={() => setIncludeStainRemoval(!includeStainRemoval)}
              label={"Stain Removal for Old Stains (+7%)"}
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-text sm:text-xl text-right">
          Price:{" "}
          <span className="text-accentText ">${finalPrice.toFixed(2)}</span>
        </h3>
      </form>
    </div>
  );
};

export default PriceForm;
