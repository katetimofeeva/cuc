"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PriceForm from "../ui/PriceForm";
import { PriceMap, Category, IFormField } from "../../../type";
import Modal from "../ui/Modal";
import ContactForm from "../ui/ContactForm";
import { formFields, socialLinks } from "../../../data";
import SocialLinks from "../ui/SocialLinks";

const priceMap: PriceMap = {
  furniture: {
    Loveseat: {
      "Cushions are not removable - cleaning": 80,
      "Cushions are not removable - cleaning & drying": 110,
      "Cushions are not removable - cleaning & drying & odor removal": 150,
      "Seat or back cushions are removable - cleaning": 100,
      "Seat or back cushions are removable - cleaning & drying": 130,
      "Seat or back cushions are removable - cleaning & drying & odor removal": 170,
      "All cushions are removable - cleaning": 115,
      "All cushions are removable - cleaning & drying": 150,
      "All cushions are removable - cleaning & drying & odor removal": 190,
    },
    "Small sofa 3 seats": {
      "Cushions are not removable - cleaning": 100,
      "Cushions are not removable - cleaning & drying": 120,
      "Cushions are not removable - cleaning & drying & odor removal": 175,
      "Seat or back cushions are removable - cleaning": 130,
      "Seat or back cushions are removable - cleaning & drying": 170,
      "Seat or back cushions are removable - cleaning & drying & odor removal": 205,
      "All cushions are removable - cleaning": 145,
      "All cushions are removable - cleaning & drying": 190,
      "All cushions are removable - cleaning & drying & odor removal": 230,
    },
    "L-shaper couch 4 seats": {
      "Cushions are not removable - cleaning": 180,
      "Cushions are not removable - cleaning & drying": 235,
      "Cushions are not removable - cleaning & drying & odor removal": 275,
      "Seat or back cushions are removable - cleaning": 200,
      "Seat or back cushions are removable - cleaning & drying": 260,
      "Seat or back cushions are removable - cleaning & drying & odor removal": 300,
      "All cushions are removable - cleaning": 220,
      "All cushions are removable - cleaning & drying": 290,
      "All cushions are removable - cleaning & drying & odor removal": 330,
    },
    "L-shaper couch 5 seats": {
      "Cushions are not removable - cleaning": 200,
      "Cushions are not removable - cleaning & drying": 260,
      "Cushions are not removable - cleaning & drying & odor removal": 300,
      "Seat or back cushions are removable - cleaning": 220,
      "Seat or back cushions are removable - cleaning & drying": 290,
      "Seat or back cushions are removable - cleaning & drying & odor removal": 330,
      "All cushions are removable - cleaning": 240,
      "All cushions are removable - cleaning & drying": 315,
      "All cushions are removable - cleaning & drying & odor removal": 355,
    },
    "U-shaper sectional sofa with 5 seats": {
      "Cushions are not removable - cleaning": 250,
      "Cushions are not removable - cleaning & drying": 325,
      "Cushions are not removable - cleaning & drying & odor removal": 375,
      "Seat or back cushions are removable - cleaning": 275,
      "Seat or back cushions are removable - cleaning & drying": 360,
      "Seat or back cushions are removable - cleaning & drying & odor removal": 410,
      "All cushions are removable - cleaning": 300,
      "All cushions are removable - cleaning & drying": 390,
      "All cushions are removable - cleaning & drying & odor removal": 440,
    },
    "U-shaper sectional sofa with 6 seats": {
      "Cushions are not removable - cleaning": 300,
      "Cushions are not removable - cleaning & drying": 390,
      "Cushions are not removable - cleaning & drying & odor removal": 440,
      "Seat or back cushions are removable - cleaning": 330,
      "Seat or back cushions are removable - cleaning & drying": 430,
      "Seat or back cushions are removable - cleaning & drying & odor removal": 480,
      "All cushions are removable - cleaning": 360,
      "All cushions are removable - cleaning & drying": 470,
      "All cushions are removable - cleaning & drying & odor removal": 520,
    },
    Armchair: {
      "Cushions are not removable - cleaning": 50,
      "Cushions are not removable - cleaning & drying": 65,
      "Cushions are not removable - cleaning & drying & odor removal": 100,
      "Seat or back cushions are removable - cleaning": 70,
      "Seat or back cushions are removable - cleaning & drying": 85,
      "Seat or back cushions are removable - cleaning & drying & odor removal": 120,
      "All cushions are removable - cleaning": 80,
      "All cushions are removable - cleaning & drying": 95,
      "All cushions are removable - cleaning & drying & odor removal": 130,
    },
  },
  mattress: {
    "Mattress (twin)": {
      "One-side cleaning": 100,
      "One-side cleaning & drying": 130,
      "One-side cleaning & drying & odor removal": 170,
      "Two-sided cleaning": 100,
      "Two-sided cleaning & drying": 130,
      "Two-sided cleaning & drying & odor removal": 170,
    },
    "Mattress (queen)": {
      "One-side cleaning": 130,
      "One-side cleaning & drying": 170,
      "One-side cleaning & drying & odor removal": 225,
      "Two-sided cleaning": 260,
      "Two-sided cleaning & drying": 340,
      "Two-sided cleaning & drying & odor removal": 430,
    },
    "Mattress (king)": {
      "One-side cleaning": 150,
      "One-side cleaning & drying": 195,
      "One-side cleaning & drying & odor removal": 250,
      "Two-sided cleaning": 280,
      "Two-sided cleaning & drying": 380,
      "Two-sided cleaning & drying & odor removal": 490,
    },
    "Mattress (cal king)": {
      "One-side cleaning": 170,
      "One-side cleaning & drying": 220,
      "One-side cleaning & drying & odor removal": 270,
      "Two-sided cleaning": 320,
      "Two-sided cleaning & drying": 420,
      "Two-sided cleaning & drying & odor removal": 520,
    },
  },
  headboard: {
    "Headboard of twin bed": {
      "Headboard cleaning": 80,
      "Headboard cleaning & drying": 100,
      "Headboard cleaning & drying & odor removal": 120,
    },
    "Headboard of queen bed": {
      "Headboard cleaning": 95,
      "Headboard cleaning & drying": 125,
      "Headboard cleaning & drying & odor removal": 150,
    },
    "Headboard of king bed": {
      "Headboard cleaning": 105,
      "Headboard cleaning & drying": 135,
      "Headboard cleaning & drying & odor removal": 165,
    },
    "Headboard of cal king bed": {
      "Headboard cleaning": 115,
      "Headboard cleaning & drying": 150,
      "Headboard cleaning & drying & odor removal": 200,
    },
  },
  "rug cleaning": {
    "4x6 feet": {
      "Area rug cleaning": 60,
      "Area rug cleaning & drying": 75,
      "Area rug cleaning & drying & odor removal": 90,
    },
    "5x8 feet": {
      "Area rug cleaning": 70,
      "Area rug cleaning & drying": 90,
      "Area rug cleaning & drying & odor removal": 105,
    },
    "6x9 feet": {
      "Area rug cleaning": 80,
      "Area rug cleaning & drying": 105,
      "Area rug cleaning & drying & odor removal": 120,
    },
    "8x10 feet": {
      "Area rug cleaning": 100,
      "Area rug cleaning & drying": 130,
      "Area rug cleaning & drying & odor removal": 150,
    },
    "9x12 feet": {
      "Area rug cleaning": 120,
      "Area rug cleaning & drying": 155,
      "Area rug cleaning & drying & odor removal": 180,
    },
    "12x14 feet": {
      "Area rug cleaning": 140,
      "Area rug cleaning & drying": 185,
      "Area rug cleaning & drying & odor removal": 210,
    },
  },
  chair: {
    "Chair with a backrest": {
      "Cleaning the chair": 30,
      "Cleaning & drying the chair": 40,
      "Cleaning & drying & odor removal the chair": 50,
    },
    "Chair without a backrest": {
      "Cleaning the chair": 20,
      "Cleaning & drying the chair": 25,
      "Cleaning & drying & odor removal the chair": 36,
    },
  },
};

const categories = {
  furniture: [
    "Loveseat",
    "Small sofa 3 seats",
    "L-shaper couch 4 seats",
    "L-shaper couch 5 seats",
    "U-shaper sectional sofa with 5 seats",
    "U-shaper sectional sofa with 6 seats",
    "Armchair",
  ],
  mattress: [
    "Mattress (twin)",
    "Mattress (queen)",
    "Mattress (king)",
    "Mattress (cal king)",
  ],
  headboard: [
    "Headboard of twin bed",
    "Headboard of queen bed",
    "Headboard of king bed",
    "Headboard of cal king bed",
  ],
  "rug cleaning": [
    "4x6 feet",
    "5x8 feet",
    "6x9 feet",
    "8x10 feet",
    "9x12 feet",
    "12x14 feet",
  ],
  chair: ["Chair with a backrest", "Chair without a backrest"],
};

const UpholsteryCleaning = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    furniture: {
      selectedType: "Loveseat",
      selectedOption: " ",
      includeStainRemoval: false,
      isOpen: false,
    },
    mattress: {
      selectedType: "Mattress (twin)",
      selectedOption: " ",
      includeStainRemoval: false,
      isOpen: false,
    },
    headboard: {
      selectedType: "Headboard of twin bed",
      selectedOption: " ",
      includeStainRemoval: false,
      isOpen: false,
    },
    "rug cleaning": {
      selectedType: "4x6 feet",
      selectedOption: " ",
      includeStainRemoval: false,
      isOpen: false,
    },
    chair: {
      selectedType: "Chair without a backrest",
      selectedOption: " ",
      includeStainRemoval: false,
      isOpen: false,
    },
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timerId);
  }, []);

  const handleClick = () => {
    router.push("/#services");
  };

  const handleSelectChange = (category: Category, value: string) => {
    setFormState(prev => ({
      ...prev,
      [category]: { ...prev[category], selectedType: value, isOpen: false },
    }));
  };

  const handleOptionChange = (category: Category, value: string) => {
    setFormState(prev => ({
      ...prev,
      [category]: { ...prev[category], selectedOption: value },
    }));
  };

  const toggleStainRemoval = (category: Category) => {
    setFormState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        includeStainRemoval: !prev[category].includeStainRemoval,
      },
    }));
  };

  const calculatePrice = (category: Category) => {
    const { selectedType, selectedOption, includeStainRemoval } =
      formState[category];
    const basePrice: number =
      priceMap[category][selectedType]?.[selectedOption] || 0;
    return includeStainRemoval ? basePrice * 1.07 : basePrice;
  };

  return (
    <section className="flex flex-col items-center px-4 py-6 space-y-6 my-6 shadow-border-shadow rounded-2xl max-w-lg mx-auto sm:px-6 sm:py-8 md:max-w-xl lg:max-w-2xl">
      <h1 className="text-2xl font-bold text-center text-text sm:text-3xl">
        Upholstery Cleaning
      </h1>
      <button
        className="text-accentText text-3xl font-bold uppercase cursor-pointer "
        onClick={handleClick}
      >
        All services
      </button>
      <p className="text-sm text-gray-500 sm:text-base">
        Minimum order $120, additional pillows are not included in the price.
      </p>

      {(
        ["furniture", "mattress", "headboard", "rug cleaning", "chair"] as const
      ).map(category => (
        <PriceForm
          key={category}
          selectedTypeFurniture={formState[category].selectedType}
          selectFurniture={e => handleSelectChange(category, e.target.value)}
          setIsOpen={isOpen =>
            setFormState(prev => ({
              ...prev,
              [category]: { ...prev[category], isOpen },
            }))
          }
          isOpen={formState[category].isOpen}
          options={Object.keys(
            priceMap[category][formState[category].selectedType] || {}
          )}
          selectedOption={formState[category].selectedOption}
          handleOptionChange={e => handleOptionChange(category, e.target.value)}
          includeStainRemoval={formState[category].includeStainRemoval}
          setIncludeStainRemoval={() => toggleStainRemoval(category)}
          finalPrice={calculatePrice(category)}
          furniture={categories[category]}
          id={category}
        />
      ))}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          ariaLabelledby={"Contact us"}
          className="m-8 border drop-shadow-md p-4 rounded-3xl w-full bg-background  relative transition-all duration-300 hover:shadow-lg"
        >
          <ContactForm
            title={"Contact us"}
            fields={formFields as IFormField[]}
            btnText={"Sent message"}
            className="border drop-shadow-md px-4 py-3 text-center rounded-3xl w-full bg-background  relative transition-all duration-300 hover:shadow-lg"
          />
          <div className="flex my-4 mx-auto text-center w-48 justify-between flex-col">
            <p className="mb-4">Send message to us </p>
            <div className="flex w-48 justify-between flex-row">
              {socialLinks.map(({ src, alt, href }) => {
                return (
                  <SocialLinks
                    key={alt}
                    src={src}
                    alt={alt}
                    href={href}
                  />
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default UpholsteryCleaning;
