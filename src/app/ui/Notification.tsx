"use client";
import React, { useEffect } from "react";

type NotificationType = "success" | "error" | "info" | "warning" | "";

interface NotificationProps {
  message: string; // Текст уведомления
  type?: NotificationType; // Тип уведомления
  onClose: () => void; // Функция для закрытия уведомления
  duration?: number; // Время показа уведомления (в миллисекундах)
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "success", // Значение по умолчанию
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }
  }, [onClose, duration]);

  const bg =
    type === "success"
      ? "bg-secondary"
      : type === "error"
      ? "bg-red-500"
      : type === "warning"
      ? "bg-accent"
      : "bg-accentText";

  return (
    <div
      className={`absolute top-1/3 ${bg} left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-4`}
    >
      <p className="break-words text-center text-base text-text">{message}</p>
      <button
        onClick={onClose}
        className="absolute top-2 right-2"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
