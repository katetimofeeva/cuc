"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import "./style.css";
import Notification from "../ui/Notification";

interface FormField {
  name: string;
  placeholder?: string;
  className?: string;
  type: "text" | "tel" | "number";
}

interface FormData {
  [key: string]: string;
}
interface ContactFormProps {
  title: string;
  fields: FormField[];
  btnText: string;
}

type CustomError = {
  message: string;
  [key: string]: any;
};

const ContactForm = ({ title, fields = [], btnText }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({});
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<
    "success" | "error" | "info" | "warning" | ""
  >("");
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Thank you for leaving your contact information! Our employee will contact you shortly."
        );
      } else {
        setStatus("error");
        setMessage("Error sending message.");
      }
    } catch (error) {
      const typedError = error as CustomError;
      console.error("Error:", typedError);
      setMessage(typedError.message);
    }
    setIsOpen(true);
    setFormData({});
  };
  const clearForm = () => {
    setIsOpen(false);
    setStatus("");
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-8 md:max-w-80 xl:max-w-96 border drop-shadow-md px-8 py-6 rounded-3xl bg-background md:w-2/5 md:ml-8 relative"
    >
      {title && (
        <span className="mx-3 font-semibold text-2xl mb-8 inline-block">
          {title}
        </span>
      )}

      {fields.map(({ name, type, placeholder, className }) => {
        return (
          <div
            className="flex flex-col w-full mb-6"
            key={name}
          >
            <label
              className="text-left mb-5 text-sm first-letter:uppercase"
              htmlFor={name}
            >
              {name}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              required
              className={className}
              onChange={handleChange}
              value={formData[name] || ""}
            />
          </div>
        );
      })}
      <div className="btnWrapper btnWrapper_animated">
        <Button
          type="submit"
          className=" text-black drop-shadow-md font-bold bg-custom-gradient hover:bg-hover-custom-gradient rounded-3xl px-4 py-4 flex items-center gap-2"
        >
          {btnText}
          <Image
            src={"/send.svg"}
            alt="Send icon"
            width={16}
            height={16}
          />
        </Button>
      </div>
      {isOpen && (
        <Notification
          message={message}
          onClose={clearForm}
          type={status}
        />
      )}
    </form>
  );
};

export default ContactForm;
