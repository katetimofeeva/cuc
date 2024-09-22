import Image from "next/image";
import Button from "./ui/Button";

export default function Home() {
  return (
    <>
      <section className="flex overflow-hidden text-text p-6 text-center flex-col md:flex-row items-center md:items-start relative md:p-0 lg:gap-8 ">
        {/* <Image
          src={"/sofa-mobile.png"}
          alt="main screen compony with contact form"
          width={768}
          height={47}
          priority
          className="absolute -z-1 -bottom-[10%] md:hidden"
        /> */}
        <Image
          src={"/sofa-big-screen.png"}
          alt="main screen compony with contact form"
          width={1440}
          height={880}
          priority
          className="absolute -z-10 max-w-full h-auto"
        />
        <div className="md:w-3/5">
          <h2 className="sm:mx-6 mt-8  mb-4">
            Carpet & Upholstery Cleaning Services
          </h2>
          <p className="mt-4 mb-2 text-white sm:text-text md:px-12 md:hidden ">
            Professional cleaning of upholstery and carpets with on-site service
            at your home or office.
          </p>
          <div className="flex gap-x-1 p-4 rounded-3xl bg-background/90  mx-2 mb-4 md:mx-12 border drop-shadow-md">
            <Image
              src={"/sofa1.svg"}
              alt="main screen compony with contact form"
              width={40}
              height={36}
              priority
            ></Image>
            <p>
              <span className="font-semibold">
                Premium European furniture cleaning:
              </span>
              We use advanced technologies and quality standards adopted in
              Europe.
            </p>
          </div>
          <div className="hidden  md:flex gap-x-1 p-4 rounded-3xl bg-background/90  mx-2 mb-4 md:mx-12 border drop-shadow-md">
            <Image
              src={"/car.svg"}
              alt="main screen compony with contact form"
              width={40}
              height={36}
              priority
            ></Image>
            <p>
              <span className="font-semibold">Professional cleaning </span>
              of upholstery and carpets with on-site service at your home or
              office.
            </p>
          </div>
        </div>
        <form className="m-8 md:max-w-80 xl:max-w-96 border drop-shadow-md px-8 py-6 rounded-3xl bg-background md:w-2/5 md:ml-8">
          <span className="mx-3 font-semibold text-2xl mb-8 inline-block">
            Book your cleaning expert
          </span>
          <div className="flex flex-col w-full mb-6">
            <label
              className="text-left mb-5 text-sm"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Wright your name"
              required
              className="  rounded-3xl border-solid border-text/20 px-6 py-5 border"
            />
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              className="text-left mb-5 text-sm"
              htmlFor="phone"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Leave your contact phone number"
              required
              className="rounded-3xl border-solid border-text/20  px-6 py-5 border"
            />
          </div>
          <Button
            type="submit"
            className="text-black drop-shadow-md font-bold bg-gradient-to-tr from-yellow-400 to-accent rounded-3xl px-4 py-4 flex items-center gap-2"
          >
            Get a free consultation
            <Image
              src={"/send.svg"}
              alt="Send icon"
              width={16}
              height={16}
            />
          </Button>
        </form>
      </section>
      <section>
        <h4>hhhhhhhhhhh</h4>
      </section>
    </>
  );
}
