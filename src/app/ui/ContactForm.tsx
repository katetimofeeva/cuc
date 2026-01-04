"use client";
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import Notification from "../ui/Notification";
import { IFormData, IContactFormProps, ICustomError } from "../../../type";

const ContactForm = ({
  title,
  fields = [],
  btnText,
  className,
  onCloseModal,
}: IContactFormProps) => {
  const [formData, setFormData] = useState<IFormData>({});
  // используем массив File для удобного управления и удаления
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<
    {
      name: string;
      url: string;
      type?: string;
      size?: number;
    }[]
  >([]);
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
        const arr = Array.from(targetFiles);
        // объединяем новые файлы с уже выбранными, избегая дубликатов (по имени+size+type)
        const merged = [...files, ...arr].filter(
          (f, idx, self) =>
            idx ===
            self.findIndex(
              s => s.name === f.name && s.size === f.size && s.type === f.type
            )
        );
        setFiles(merged);
        // очищаем предыдущие object URLs
        previews.forEach(pv => URL.revokeObjectURL(pv.url));
        // создаём превью для merged
        const p = merged.map(f => ({
          name: f.name,
          url: URL.createObjectURL(f),
          type: f.type,
          size: f.size,
        }));
        setPreviews(p);
        // сброс native input чтобы позволить выбрать те же файлы снова и триггерить событие
        if (fileInputRef.current) fileInputRef.current.value = "";
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

    if (files && files.length > 0) {
      files.forEach(file => {
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
    // очищаем файлы и превью
    files.forEach(() => {});
    setFiles([]);
    previews.forEach(p => URL.revokeObjectURL(p.url));
    setPreviews([]);

    if (onCloseModal) {
      onCloseModal();
    }
  };

  const clearForm = () => {
    setIsOpen(false);
    setStatus("");
    setMessage("");
    setFiles([]);
    previews.forEach(p => URL.revokeObjectURL(p.url));
    setPreviews([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // при размонтировании / изменении превью — очищаем object URLs
  useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const removeFileAt = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== index);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          className="uppercase mx-2 font-semibold text-2xl mb-4 inline-block text-accentText"
        >
          {title}
        </h2>
      )}

      {fields.map(({ name, type, placeholder, classField }) => (
        <div
          className="flex flex-col w-full mb-2 "
          key={name}
        >
          {type === "textarea" ? (
            <textarea
              name={name}
              id={name}
              placeholder={placeholder}
              required
              className={`${classField} h-32 resize-none  `}
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
              className={`${classField} `}
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
          className="block text-white bg-accentText py-2 px-4 rounded-lg cursor-pointer text-center hover:bg-opacity-90 transition duration-200 w-full md:mx-auto shadow-md hover:shadow-lg"
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
        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {previews.map((p, i) => (
              <div
                key={p.url}
                className="relative border rounded-md overflow-hidden p-1 bg-white flex flex-col items-center justify-center"
              >
                {p.type && p.type.startsWith("image") ? (
                  // маленькое превью
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.url}
                    alt={p.name}
                    className="w-20 h-20 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h10M7 11h10M7 15h10"
                      />
                    </svg>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeFileAt(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  aria-label={`Remove ${p.name}`}
                >
                  ×
                </button>
                <div className="text-xs mt-1 text-center">{p.name}</div>
              </div>
            ))}
          </div>
        )}
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
