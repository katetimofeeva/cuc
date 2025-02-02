"use client";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import Notification from "../ui/Notification";
import { IFormData, IContactFormProps, ICustomError } from "../../../type";

const ContactForm = ({
  title,
  fields = [],
  btnText,
  className,
}: IContactFormProps) => {
  const [formData, setFormData] = useState<IFormData>({});
  const [files, setFiles] = useState<FileList | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<
    "success" | "error" | "info" | "warning" | ""
  >("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      const targetFiles = (e.target as HTMLInputElement).files;
      if (targetFiles) {
        setFiles(targetFiles);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    if (files) {
      Array.from(files).forEach(file => {
        formDataToSend.append("files", file);
      });
    }

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: formDataToSend,
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
      const typedError = error as ICustomError;
      console.error("Error:", typedError);
      setMessage(typedError.message);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
    setIsOpen(true);
    setFormData({});
    setFiles(null);
  };

  const clearForm = () => {
    setIsOpen(false);
    setStatus("");
    setMessage("");
    setFiles(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      aria-labelledby="form-title"
    >
      {title && (
        <h2
          id="form-title"
          className="uppercase mx-3 font-semibold text-2xl mb-3 inline-block text-accentText"
        >
          {title}
        </h2>
      )}

      {fields.map(({ name, type, placeholder, className }) => (
        <div
          className="flex flex-col w-full mb-6"
          key={name}
        >
          {type === "textarea" ? (
            <textarea
              name={name}
              id={name}
              placeholder={placeholder}
              required
              className={`${className} h-32 resize-none  `}
              onChange={handleChange}
              aria-multiline="true"
              value={formData[name] || ""}
              aria-label={placeholder}
            />
          ) : (
            <input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              required
              className={`${className} `}
              onChange={handleChange}
              value={formData[name] || ""}
              aria-label={placeholder}
            />
          )}
        </div>
      ))}

      {/* Поле загрузки файлов */}
      <div className="flex flex-col w-full mb-6">
        <label
          htmlFor="files"
          className="block text-white bg-accentText py-2 px-4 rounded-lg cursor-pointer text-center hover:bg-opacity-90 transition duration-200 lg:w-3/4 md:mx-auto shadow-md hover:shadow-lg"
        >
          Attach a photo of your furniture
        </label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          className="sr-only"
          onChange={handleChange}
          ref={fileInputRef}
          aria-label="Attach a photo of your furniture"
        />
      </div>

      <div>
        <Button
          type="submit"
          className="mb-4 hover:bg-opacity-80 hover:scale-105 transition-all duration-300 ease-in-out  drop-shadow-md font-bold bg-custom-gradient hover:bg-hover-custom-gradient rounded-3xl px-4 py-4 flex items-center gap-2 w-full justify-center"
          disabled={isLoading}
          aria-label={isLoading ? "Sending form data" : btnText}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </div>
          ) : (
            <>
              {btnText}
              <Image
                src={"/send.svg"}
                alt="Send icon"
                width={16}
                height={16}
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-gray-500 text-center">
        You agree to our terms and conditions
      </p>
      {isOpen && (
        <Notification
          message={message}
          onClose={clearForm}
          type={status}
          aria-live="polite"
        />
      )}
    </form>
  );
};

export default ContactForm;
