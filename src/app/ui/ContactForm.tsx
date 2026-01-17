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
        const merged = [...files, ...arr].filter(
          (f, idx, self) =>
            idx ===
            self.findIndex(
              s => s.name === f.name && s.size === f.size && s.type === f.type
            )
        );
        setFiles(merged);
        previews.forEach(pv => URL.revokeObjectURL(pv.url));
        const p = merged.map(f => ({
          name: f.name,
          url: URL.createObjectURL(f),
          type: f.type,
          size: f.size,
        }));
        setPreviews(p);
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
        setMessage("Thank you! Our employee will contact you shortly.");
      } else {
        setStatus("error");
        setMessage("Error sending message.");
      }
    } catch (error) {
      const typedError = error as ICustomError;
      setMessage(typedError.message);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
    setIsOpen(true);
    setFormData({});
    setFiles([]);
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col max-w-full px-1 sm:px-4 ${className}`}
    >
      {title && (
        <h2 className="uppercase font-bold text-base sm:text-lg mb-2 text-accentText text-center leading-tight">
          {title}
        </h2>
      )}

      {/* Сетка полей: на очень маленьких экранах уменьшаем зазоры */}
      <div className="grid grid-cols-1 gap-1.5 mb-2">
        {fields.map(({ name, type, placeholder, classField }) => (
          <div
            key={name}
            className="w-full"
          >
            {type === "textarea" ? (
              <textarea
                name={name}
                placeholder={placeholder}
                required
                className={`${classField} h-16 sm:h-24 w-full text-xs sm:text-sm  rounded-lg border border-gray-300 outline-none focus:border-accentText`}
                onChange={handleChange}
                value={formData[name] || ""}
              />
            ) : (
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                required
                className={`${classField} h-9 sm:h-11 w-full text-xs sm:text-sm px-3 rounded-lg border border-gray-300 outline-none focus:border-accentText`}
                onChange={handleChange}
                value={formData[name] || ""}
              />
            )}
          </div>
        ))}
      </div>

      {/* Сверхкомпактный блок загрузки */}
      <div className="mb-2">
        <label
          htmlFor="files"
          className="flex justify-center gap-2 text-white  bg-accentText py-3 px-4 rounded-xl cursor-pointer text-center text-sm font-medium hover:bg-opacity-90 transition shadow-sm w-full"
        >
          <span>📷</span>
          <span>
            {previews.length > 0
              ? `Files: ${previews.length}`
              : "Add Furniture Photo"}
          </span>
        </label>
        <input
          type="file"
          id="files"
          multiple
          className="sr-only"
          onChange={handleChange}
          ref={fileInputRef}
          accept="image/*"
        />

        {/* Мини-превью (горизонтальные и очень маленькие) */}
        {previews.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto py-1 no-scrollbar">
            {previews.map((p, i) => (
              <div
                key={p.url}
                className="relative flex-shrink-0 w-12 h-12 rounded-md overflow-hidden shadow-sm"
              >
                <img
                  src={p.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFileAt(i)}
                  className="absolute top-0 right-0  bg-accentText text-white w-4 h-4 flex items-center justify-center text-[10px]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Кнопка отправки - высота h-10 для экономии места */}
      <Button
        type="submit"
        className="h-10 sm:h-12 text-xs sm:text-sm font-bold bg-custom-gradient rounded-xl w-full flex items-center gap-2 justify-center shadow-md active:scale-95"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : btnText}
        {!isLoading && (
          <Image
            src="/send.svg"
            alt=""
            width={12}
            height={12}
          />
        )}
      </Button>

      <p className="text-[9px]  text-center mt-2 leading-none">
        By clicking, you agree to our terms
      </p>

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
