"use client";

import Image from "next/image";
import ContactForm from "./ui/ContactForm";

import { stainInfo, pricesCards, upholsteryCleaningSteps } from "../../data.js";
import { CUC_PHONE, CUC_EMAIL } from "../../constant";
import Card from "./ui/price-card/Card";
import ProcessSteps from "./ui/ProgressStep";
import { IFormField } from "../../type";
import { useRouter } from "next/navigation";
import { formFields } from "../../data";

export default function Home() {
  const router = useRouter();

  const handleClick = (name: string) => {
    router.push(`/upholstery-cleaning#${name}`);
  };
  return (
    <>
      <section className="flex overflow-hidden bg-main-screen-mob lg:bg-main-screen bg-no-repeat bg-cover bg-center text-text p-6 text-center flex-col md:flex-row items-center md:items-start relative md:p-0 lg:gap-8 ">
        <div className="md:w-3/5">
          <h2 className="sm:mx-6  mt-8  mb-4 text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
            Carpet & Upholstery Cleaning Services
          </h2>
          <p className="text-2xl font-bold mb-4 text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
            Our services extend to Santa Rosa and the surrounding areas,
            including towns like Petaluma, Rohnert Park, Sebastopol, Healdsburg,
            Napa, and beyond.
          </p>
          <p className="mt-4 mb-2 text-white   md:px-12 md:hidden text-bold">
            Professional cleaning of upholstery and carpets with on-site service
            at your home or office.
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
                Premium European furniture cleaning:
              </span>
              We use advanced technologies and quality standards adopted in
              Europe.
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
              <span className="font-semibold">Professional cleaning </span>
              of upholstery and carpets with on-site service at your home or
              office.
            </p>
          </div>
        </div>
        <ContactForm
          title={"Contact Us"}
          fields={formFields as IFormField[]}
          btnText="Get a free consultation"
          className="m-4 md:m-8 md:max-w-80 xl:max-w-96 border drop-shadow-md px-4 py-3 rounded-3xl w-full bg-background md:w-2/5 md:ml-8 relative transition-all duration-300 hover:shadow-lg"
        />
      </section>
      <section className="px-6">
        <h2 className="sm:mx-6 mt-8  mb-4 text-center ext-6xl py-9 uppercase text-2xl lg:text-3xl ">
          Deep cleaning of upholstered furniture from{" "}
          <span className=" text-accentText">stains and odors</span>.
        </h2>
        <div className="grid-cols-2 gap-4 md:gap-8 md:grid-cols-3 lg:grid-cols-5 grid ">
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
          Cleaning furniture at home from all known contaminants
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
            Cost of professional upholstery cleaning
          </span>{" "}
          with on-site Service
        </h2>

        <h4 className="mb-2 ">20% discount for the first order</h4>
        <p className=" md:w-3/4 m-auto mb-4">
          *Pricing for upholstery cleaning is based on factors such as the
          number of seats, the extent of stains or soiling, the type of fabric,
          and the complexity of the cleaning process. Our technician will
          provide the final quote after an on-site assessment. For a preliminary
          estimate, please send pictures of your furniture, your location (zip
          code), and any relevant details to{" "}
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
        <p className="text-xl">
          We provide an optional drying service for an additional 30%. With this
          service, your furniture will be ready to use within 1-3 hours after
          cleaning. Without drying, the furniture may take 15-24 hours to dry
          completely
        </p>
        {pricesCards.length > 0 && (
          <div className="grid-cols gap-4 md:gap-8 md:grid-cols-3 lg:grid-cols-5 grid m-6">
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
                    <div className=" absolute -top-2 -right-2 w-20 h-20 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-custom-gradient text-black text-sm font-bold">
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
          The furniture cleaning process takes
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
          <span className=" text-accentText">Main steps </span> of professional
          carpet cleaning
        </h2>
        <ProcessSteps steps={upholsteryCleaningSteps} />;
      </section>
    </>
  );
}
