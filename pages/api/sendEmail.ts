import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import type { Attachment } from "nodemailer/lib/mailer";

export const config = {
  api: {
    bodyParser: false, // Отключаем встроенный парсер для работы с `formidable`
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({
      multiples: true, // Разрешаем загрузку нескольких файлов
    });

    // Парсинг формы, включая файлы
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ message: "Error parsing form data." });
      }

      const { name, phone, email, questions } = fields;

      // Настройка транспортера Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail", // Или другой сервис
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Формирование вложений из загруженных файлов
      const attachments: Attachment[] = [];
      if (files.files) {
        const uploadedFiles = Array.isArray(files.files)
          ? files.files
          : [files.files];

        uploadedFiles.forEach(file => {
          attachments.push({
            filename: file.originalFilename || "unknown",
            path: file.filepath,
          });
        });
      }

      try {
        // Настройка параметров письма
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "New request from a client",
          text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nQuestions: ${questions}`,
          attachments, // Добавляем вложения
        };

        // Отправка письма
        await transporter.sendMail(mailOptions);
        console.log(attachments, "attachments");
        // Удаление временных файлов после отправки
        attachments.forEach(attachment => {
          if (attachment.path && typeof attachment.path === "string") {
            fs.unlinkSync(attachment.path);
          }
        });

        res
          .status(200)
          .json({ message: "Email with files sent successfully!" });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Server error sending email." });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
