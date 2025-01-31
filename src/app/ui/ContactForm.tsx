"use client";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import Notification from "../ui/Notification";
import { IFormData, IContactFormProps, ICustomError } from "../../../type";

const ContactForm = ({ title, fields = [], btnText }: IContactFormProps) => {
  const [formData, setFormData] = useState<IFormData>({});
  const [files, setFiles] = useState<FileList | null>(null); // Хранение загруженных файлов
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<
    "success" | "error" | "info" | "warning" | ""
  >("");
  const [message, setMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Если это загрузка файлов
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

    // Создание FormData для отправки данных и файлов
    const formDataToSend = new FormData();

    // Добавляем текстовые поля
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    // Добавляем файлы, если есть
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
    }
    setIsOpen(true);
    setFormData({});
    setFiles(null); // Очищаем файлы после отправки
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
      className="m-8 md:max-w-80 xl:max-w-96 border drop-shadow-md px-4 py-3 rounded-3xl bg-background md:w-2/5 md:ml-8 relative"
    >
      {title && (
        <span className="uppercase mx-3 font-semibold text-2xl mb-3 inline-block">
          {title}
        </span>
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
              className={`${className} h-32 resize-none`}
              onChange={handleChange}
              aria-multiline="true"
              value={formData[name] || ""}
            />
          ) : (
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
          )}
        </div>
      ))}

      {/* Поле загрузки файлов */}
      <div className="flex flex-col w-full mb-6">
        <label
          htmlFor="files"
          className="block text-white bg-primary py-2 px-4 rounded-lg cursor-pointer text-center hover:bg-opacity-90 transition duration-200 lg:w-3/4 md:mx-auto"
        >
          Attach a photo of your furniture
        </label>
        <input
          type="file"
          id="files"
          multiple
          className="sr-only"
          onChange={handleChange}
          ref={fileInputRef}
        />
      </div>

      <div>
        <Button
          type="submit"
          className="mb-4 hover:bg-opacity-80 hover:scale-104 transition-all duration-300 ease-in-out text-black drop-shadow-md font-bold bg-custom-gradient hover:bg-hover-custom-gradient rounded-3xl px-4 py-4 flex items-center gap-2"
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
      <p>You agree to our terms and conditions</p>
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
