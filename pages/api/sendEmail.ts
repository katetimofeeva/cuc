import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// Отключаем встроенный парсер для работы с formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({
      multiples: true, // Поддержка загрузки нескольких файлов
      uploadDir: "/tmp", // Временная директория на Vercel
      keepExtensions: true, // Сохранение расширения файлов
    });

    // Парсинг запроса с помощью formidable
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ message: "Error parsing form data." });
      }

      const { name, phone, email, questions } = fields;

      // Обработка файлов (если они есть)
      const uploadedFiles = files.files
        ? Array.isArray(files.files)
          ? files.files
          : [files.files]
        : [];

      // Массив вложений для отправки через email
      const attachments = uploadedFiles.map(file => ({
        filename: file.originalFilename || "unknown",
        path: file.filepath,
      }));

      try {
        // Настройка Nodemailer
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER, // Ваш email
            pass: process.env.EMAIL_PASS, // Ваш пароль приложения
          },
        });

        // Настройка письма
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "New request from a client",
          text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nQuestions: ${questions}`,
          attachments, // Вложения (могут быть пустыми)
        };

        // Отправка письма
        await transporter.sendMail(mailOptions);

        // Удаление временных файлов (если они есть)
        if (attachments.length > 0) {
          attachments.forEach(attachment => {
            if (attachment.path && typeof attachment.path === "string") {
              fs.unlinkSync(attachment.path); // Удаляем файл после отправки
            }
          });
        }

        res.status(200).json({ message: "Email sent successfully!" });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Server error sending email." });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
