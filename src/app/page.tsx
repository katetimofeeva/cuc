"use client";

import Image from "next/image";
import ContactForm from "./ui/ContactForm";
import Modal from "./ui/Modal";

import { pricesCards, upholsteryCleaningSteps } from "../../data.js";
import { stainInfo } from "../../constant";
import { CUC_PHONE, CUC_EMAIL } from "../../constant";
import Card from "./ui/price-card/Card";
import ProcessSteps from "./ui/ProgressStep";
import { IFormField } from "../../type";
import { useRouter } from "next/navigation";
import { formFields } from "../../data";
import Button from "./ui/Button";
import { useState } from "react";
import SocialLinks from "./ui/SocialLinks";
import { socialLinks } from "../../data";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (name: string) => {
    router.push(`/upholstery-cleaning/${name}`);
  };
  return (
    <>
      <section className="flex overflow-hidden bg-main-screen-mob lg:bg-main-screen bg-no-repeat bg-cover bg-center text-text p-6 text-center flex-col md:flex-row items-center md:items-start relative md:p-0 lg:gap-8 ">
        <div className="md:w-3/5">
          <h2 className="sm:mx-6  mt-8  mb-4 text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
            Professional Carpet & Upholstery Cleaning
          </h2>
          <p className="text-2xl font-bold mb-4 text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
            Serving Santa Rosa, Petaluma, Rohnert Park, Sebastopol, Healdsburg,
            Napa & Nearby Areas.
          </p>
          <p className="mt-4 mb-2 text-text   md:px-12 md:hidden text-bold">
            Expert on-site upholstery and carpet cleaning for your home or
            office, ensuring freshness and hygiene.
          </p>
          <div className="flex gap-x-1 p-4 rounded-3xl bg-background/90  mx-2 mb-4 md:mx-12 border drop-shadow-md inform-card">
            <Image
              src={"/sofa1.svg"}
              alt="European furniture cleaning illustration"
              width={40}
              height={36}
              priority
            />
            <p>
              <span className="font-semibold pr-2">
                Premium European cleaning standards:
              </span>
              Advanced technologies for deep cleaning and long-lasting
              freshness.
            </p>
          </div>
          <div className="hidden  md:flex gap-x-1 p-4 rounded-3xl bg-background/90  mx-2 mb-4 md:mx-12 border drop-shadow-md inform-card">
            <Image
              src={"/car.svg"}
              alt="Mobile cleaning service illustration"
              width={40}
              height={36}
              loading="lazy"
              decoding="async"
            />
            <p>
              <span className="font-semibold">Convenient mobile service</span>
              at your location for hassle-free cleaning.
            </p>
          </div>
          <Button
            className={
              "mb-4 hover:bg-opacity-80 hover:scale-105 transition-all duration-300 ease-in-out  drop-shadow-md font-bold bg-custom-gradient hover:bg-hover-custom-gradient rounded-3xl px-4 py-4 flex items-center gap-2 justify-center"
            }
            toggleMenu={() => setIsModalOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7-7 7M21 12H3"
              />
            </svg>
            Get a Free Quote
          </Button>
        </div>
      </section>
      <section className="px-6">
        <h2 className="sm:mx-6 mt-8  mb-4 text-center ext-6xl py-9 uppercase text-2xl lg:text-3xl ">
          Deep upholstery cleaning for{" "}
          <span className=" text-accentText">stains and odors</span>.
        </h2>
        <div className="grid grid-cols-4 gap-3  lg:grid-cols-5">
          {stainInfo.map((card, i) => {
            return (
              <Card
                key={`p_${i}`}
                cardInfo={card}
              >
                <Image
                  src={card.src}
                  alt={card.description}
                  width={card.size || 60}
                  height={60}
                  loading="lazy"
                />
              </Card>
            );
          })}
        </div>
        <h3 className="font-semibold text-text mt-8  mb-4">
          Say 'Goodbye' to stubborn stains & odors!
        </h3>
        <p className="mb-2">
          Spilled coffee on your favorite couch? Did your pet leave an
          unexpected "gift"? Kids accidentally spill juice, or stubborn stains
          from pet accidents remain? With our modern, eco-friendly cleaning
          solutions, we effectively remove stains, dirt, odors, and even dust
          mites from your furniture. Our professional, on-site eco-cleaning
          services for upholstered furniture are designed to restore its
          freshness and cleanliness while preserving the fabric's quality and
          extending its lifespan.
        </p>
        <p className="mb-2">
          We specialize in tackling a wide range of stains from food and drinks,
          including sauces, beverages, grease, and oils, as well as removing
          stubborn stains and odors caused by pet and child accidents, such as
          urine. Our advanced products and proven methods neutralize unpleasant
          odors, eliminate stains, and provide effective disinfection to remove
          bacteria, allergens, and microorganisms. Experience the difference of
          expert care with furniture that looks, feels, and smells as fresh and
          clean as new!
        </p>
      </section>
      <section
        className="text-center px-6"
        id="services"
      >
        <h2 className="sm:mx-6 mt-8  mb-4  ext-6xl pt-9 uppercase text-2xl lg:text-3xl ">
          <span className=" text-accentText">
            Affordable upholstery cleaning
          </span>{" "}
          at your doorstep
        </h2>
        <h4 className="mb-2 font-bold text-lg">
          Limited Time: 20% Off First Order!
        </h4>
        <p className=" md:w-3/4 m-auto mb-4">
          *Pricing for upholstery cleaning is based on factors such as the
          number of seats, the extent of stains or soiling, the type of fabric,
          and the complexity of the cleaning process. Our technician will
          provide the final quote after an on-site assessment.
        </p>{" "}
        <p className="mb-4">
          Get a quote today! Share pictures of your furniture, location (zip
          code), and any relevant details via{" "}
          {CUC_PHONE && (
            <a
              className="hover:text-accentText hover:font-bold"
              href={`tel:${CUC_PHONE}`}
              aria-label={`Call us at ${CUC_PHONE}`}
            >
              {CUC_PHONE}
            </a>
          )}{" "}
          or email us at{" "}
          {CUC_EMAIL && (
            <a
              href={`mailto:${CUC_EMAIL}`}
              className="hover:text-accentText"
              aria-label={`Send an email to ${CUC_EMAIL}`}
            >
              {CUC_EMAIL}
            </a>
          )}
        </p>
        <p>
          We provide an optional drying service for an additional 30%. With this
          service, your furniture will be ready to use within 1-3 hours after
          cleaning. Without drying, the furniture may take 15-24 hours to dry
          completely
        </p>
        {pricesCards.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 m-6">
            {pricesCards.map((price, i) => {
              return (
                <Card
                  key={`p_${i}`}
                  cardInfo={price}
                  handleClick={handleClick}
                >
                  <div className="relative">
                    <Image
                      src={price.src}
                      alt={price.title}
                      width={300}
                      height={300}
                      loading="lazy"
                    />
                    <div className="absolute -top-2 -right-2  flex items-center justify-center rounded-full bg-custom-gradient text-black text-xs sm:text-sm md:text-base font-bold w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 ">
                      from <br />
                      {price.price}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        <p className="mb-4 text-start">
          Professional cleaning Process
          <span className="font-bold">1-2 hours</span> for standard cleaning or
          <span className="font-bold"> 2-3 hours</span> (without drying, the
          furniture takes 12-24 hours to air dry). The price includes cleaning
          all furniture elements, beds, and sofa cushions; dust removal; deep
          chemical cleaning; stain removal; elimination of unpleasant odors
          (urine, sweat, and more); disinfection (removal of dust mites and
          microorganisms); antibacterial treatment; and vacuum drying to reduce
          drying time.
        </p>
      </section>
      <section>
        <h2 className="sm:mx-6 mt-8  mb-4 text-center ext-6xl py-9 uppercase text-2xl lg:text-3xl">
          Step-by-Step
          <span className="text-accentText">professional cleaning process</span>
        </h2>
        <ProcessSteps steps={upholsteryCleaningSteps} />;
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="rounded-3xl p-6"
        ariaLabelledby="contact-form-title"
      >
        <ContactForm
          title={"Get a Free Consultation"}
          fields={formFields as IFormField[]}
          btnText="Get My Free Estimate"
          onCloseModal={() => setIsModalOpen(false)}
        />
        <div className="flex my-4 mx-auto text-center w-48 justify-between flex-col">
          <p className="mb-4">Message us directly </p>
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
    </>
  );
}
