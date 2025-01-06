import MainBanner from "@/app/ui/main-baner/MainBanner";
import React from "react";

import { prices } from "../../../../data";
import { CUC_EMAIL, CUC_PHONE } from "../../../../constant";
import ProcessSteps from "@/app/ui/ProgressStep";

const steps = [
  {
    title: "Inspection and preparation",
    description:
      "The technician examines the carpet, determines its type, level of dirt, and tests colorfastness. Furniture is moved to provide full access to the carpet.",
  },
  {
    title: "Dry cleaning",
    description:
      "A high-powered vacuum removes dust, pet hair, sand, and other debris to prevent damage to the carpet fibers during deep cleaning.",
  },
  {
    title: "Spot treatment",
    description:
      "Stubborn stains are pre-treated with special, safe cleaning solutions to ensure effective removal.",
  },
  {
    title: "Deep cleaning (Extraction)",
    description:
      "We use professional extractors with hot and cold water to remove dirt, dust, and allergens from deep within the carpet fibers.",
  },
  {
    title: "Rinsing and residue removal",
    description:
      "The carpet is thoroughly rinsed with water to eliminate any remaining cleaning solution and prevent residue buildup.",
  },
  {
    title: "Disinfection and Carpet Protection (optional)",
    description:
      "The carpet is treated with antibacterial solutions to kill germs and dust mites, and a protective coating is applied to prevent future stains.",
  },
  {
    title: "Moisture removal and drying",
    description:
      "Professional equipment removes excess moisture, ensuring the carpet dries quickly and thoroughly.",
  },
  {
    title: "Final inspection",
    description:
      "The technician inspects the final result to ensure the carpet is clean, and additional treatments are applied if needed.",
  },
];

const PriceCarpet = () => {
  const { src, title } = prices[0];
  return (
    <>
      <MainBanner
        isTextStroke={true}
        title={title}
        backgroundImage={src}
      />
      <div className="m-6">
        <h2 className="text-center mt-3 uppercase">
          Welcome to our carpet cleaning services page
        </h2>
        <p className="mb-3">
          We provide professional carpet cleaning using advanced extractors with
          both hot and cold water to effectively remove dirt, stains, and
          allergens from deep within your carpet fibers. Our experienced
          technicians will inspect your carpets, assess their condition, and
          guide you through the cleaning process to ensure the best results.
        </p>
        <p className="mb-3">
          Pricing depends on the size and condition of your carpets, your
          location, and the floor level of your space. A minimum call-out fee
          may apply for areas outside our immediate service region. For a
          personalized quote, simply send us photos of your carpets, your zip
          code, and any additional details to {CUC_PHONE} or email us:
          {CUC_EMAIL}. Below, you'll find an overview of our cleaning process
          and estimated pricing for our services.
        </p>
      </div>
      <ProcessSteps steps={steps} />;
    </>
  );
};

export default PriceCarpet;
