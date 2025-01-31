import { CUC_EMAIL, CUC_ADDRESS, CUC_PHONE } from "../../../constant";

import SocialLinks from "./../ui/SocialLinks";
import { socialLinks } from "./../../../data";

export default function Contact() {
  return (
    <div className="min-h-[800px]">
      <h2 className="text-3xl py-9 text-center uppercase text-accentText">
        Contacts
      </h2>
      <div className="p-6 rounded-lg text-text max-w-[1000px] mx-auto">
        <p className="text-lg text-center mb-6">
          We’re here to help with all your furniture, carpet, and rug cleaning
          needs. Whether you have questions about our services, need to book an
          appointment, or want to inquire about special treatments, our team is
          ready to assist. Feel free to reach out to us using any of the contact
          methods below.
        </p>
        <div>
          <p className="mb-4">
            <strong>Visit us at:</strong>
            <br />
            {CUC_ADDRESS}. We’re always ready to assist you, no matter where you
            are! Our services extend to Santa Rosa and the surrounding areas
            within a 30-mile radius, including towns like Petaluma, Rohnert
            Park, Sebastopol, Healdsburg, Napa, and beyond. Feel free to contact
            us, and we’ll be happy to help!
          </p>
          <p className="mb-4">
            <strong>Call us at:</strong>
            <br />
            {CUC_PHONE} for prompt assistance, our customer service team is
            available Monday to Saturday from 9 AM to 8 PM.
          </p>
          <div>
            <p>Send message to us </p>
            <div className="flex w-20 justify-between ">
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
          <p className="mb-4">
            <strong>Email us at:</strong>
            <br />
            {CUC_EMAIL} and we’ll respond within 24 hours.
          </p>
          <p>
            <strong>Working time:</strong>
            <br />
            Mon – Sat: 9 AM – 8 PM
          </p>
        </div>
      </div>

      {/* <Contacts /> */}
    </div>
  );
}
