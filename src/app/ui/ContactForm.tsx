"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import "./style.css";

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
const ContactForm = ({ title, fields = [], btnText }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({});

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
        console.log("Сообщение успешно отправлено!");
      } else {
        console.log("Ошибка при отправке сообщения.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      console.log("Ошибка при отправке сообщения.");
    }

    setFormData({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-8 md:max-w-80 xl:max-w-96 border drop-shadow-md px-8 py-6 rounded-3xl bg-background md:w-2/5 md:ml-8"
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
              className="text-left mb-5 text-sm"
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
    </form>
  );
};

export default ContactForm;
