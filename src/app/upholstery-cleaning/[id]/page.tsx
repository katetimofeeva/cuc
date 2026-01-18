"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import PriceForm from "../../ui/PriceForm";
import Modal from "../../ui/Modal";
import ContactForm from "../../ui/ContactForm";
import { formFields, socialLinks } from "../../../../data";
import { Category, IFormField } from "../../../../type";
import SocialLinks from "../../ui/SocialLinks";

// Импортируем твои данные (предположим, они в файле data/prices.ts)
import { categories, priceMap } from "../../../../data";

export default function ServiceCategoryPage() {
  const params = useParams();
  const router = useRouter();

  // Получаем id из URL (например, mattress или furniture)
  const categoryId = params?.id as string;

  // Проверка: существует ли такая категория в наших данных
  const isValidCategory = categoryId in categories;

  // Инициализируем состояние формы
  const [formState, setFormState] = useState({
    selectedType: isValidCategory ? (categories as any)[categoryId][0] : "",
    selectedOption: "",
    includeStainRemoval: false,
    isOpen: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsModalOpen(true);
    }, 45000);

    return () => clearTimeout(timerId);
  }, []);
  // Получаем список опций (cleaning, drying и т.д.) для выбранного типа мебели
  const currentOptions = useMemo(() => {
    if (!isValidCategory || !formState.selectedType) return [];
    const optionsObj = (priceMap as any)[categoryId][formState.selectedType];
    return optionsObj ? Object.keys(optionsObj) : [];
  }, [categoryId, formState.selectedType, isValidCategory]);

  if (!isValidCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-accentText underline"
        >
          Return to home
        </button>
      </div>
    );
  }

  const handleSelectChange = (value: string) => {
    setFormState(prev => ({
      ...prev,
      selectedType: value,
      selectedOption: "", // Сбрасываем опцию при смене типа (например, Twin -> Queen)
    }));
  };

  const calculatePrice = () => {
    const { selectedType, selectedOption, includeStainRemoval } = formState;
    if (!selectedType || !selectedOption) return 0;

    const basePrice =
      (priceMap as any)[categoryId][selectedType][selectedOption] || 0;
    // Твоя наценка 7% за удаление пятен
    return includeStainRemoval ? Math.round(basePrice * 1.07) : basePrice;
  };

  return (
    <section className="flex flex-col items-center px-4 py-10 space-y-8 max-w-2xl mx-auto min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-text mb-2">
          {categoryId.replace("-", " ")} Price Estimate
        </h1>
        <p className="text-gray-500">
          Professional cleaning in Santa Rosa & nearby areas
        </p>
      </div>

      <div className="w-full bg-white shadow-border-shadow rounded-3xl p-4 md:p-6 border border-gray-100">
        <PriceForm
          selectedTypeFurniture={formState.selectedType}
          selectFurniture={e => handleSelectChange(e.target.value)}
          setIsOpen={val => setFormState(p => ({ ...p, isOpen: !!val }))}
          isOpen={formState.isOpen}
          options={currentOptions}
          selectedOption={formState.selectedOption}
          handleOptionChange={e =>
            setFormState(p => ({ ...p, selectedOption: e.target.value }))
          }
          includeStainRemoval={formState.includeStainRemoval}
          setIncludeStainRemoval={() =>
            setFormState(p => ({
              ...p,
              includeStainRemoval: !p.includeStainRemoval,
            }))
          }
          finalPrice={calculatePrice()}
          furniture={(categories as any)[categoryId]}
          id={categoryId}
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-6 bg-accentText text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-md"
        >
          Book this service
        </button>
      </div>

      <button
        onClick={() => router.back()}
        className="text-sm text-gray-400 hover:text-accentText transition-colors"
      >
        ← Go back
      </button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ariaLabelledby="Contact"
          className="m-8 border drop-shadow-md p-4 rounded-3xl w-full bg-background  relative transition-all duration-300 hover:shadow-lg"
        >
          <ContactForm
            title={`Get a Quote for ${formState.selectedType}`}
            fields={formFields as IFormField[]}
            btnText="Send Request"
            onCloseModal={() => setIsModalOpen(false)}
          />
          <div className="flex my-4 mx-auto text-center w-48 justify-between flex-col">
            <p className="mb-4">"Message us directly"</p>
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
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-custom-gradient shadow-border-shadow text-black p-4 rounded-full flex items-center gap-2 group z-49 hover:shadow-lg transition-all duration-300 animate-[pulse-scale_2s_ease-in-out_infinite] hover:animate-none focus:animate-none transform-gpu will-change-transform"
        aria-label="Contact form"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 motion-safe:animate-wiggle transform-gpu will-change-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm font-medium  px-2 py-1 rounded-full  transform-gpu">
          Contact us
        </span>
      </button>
    </section>
  );
}
