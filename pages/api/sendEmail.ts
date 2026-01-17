import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const uploadDir = "/tmp";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({
    multiples: true,
    uploadDir: uploadDir,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res.status(500).json({ message: "Error parsing form data." });
    }

    // ВАЖНО: В новых версиях formidable поля приходят как массивы
    const getSingleValue = (val: any) => (Array.isArray(val) ? val[0] : val);

    const name = getSingleValue(fields.name);
    const phone = getSingleValue(fields.phone);
    const email = getSingleValue(fields.email);
    const questions = getSingleValue(fields.questions);

    // Логика обработки файлов
    let uploadedFiles: any[] = [];
    if (files.files) {
      uploadedFiles = Array.isArray(files.files) ? files.files : [files.files];
    }

    // Создаем массив вложений для Nodemailer
    const attachments = uploadedFiles
      .filter(file => file && file.filepath) // Проверка на валидность
      .map(file => ({
        filename: file.originalFilename || `upload-${Date.now()}`,
        path: file.filepath,
      }));

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Отправляем самому себе
        subject: `New Request from ${name}`,
        text: `
          New request details:
          -------------------
          Name: ${name || "N/A"}
          Phone: ${phone || "N/A"}
          Email: ${email || "N/A"}
          Message: ${questions || "No message"}
        `,
        attachments,
      };

      await transporter.sendMail(mailOptions);

      // Чистим временные файлы после отправки
      attachments.forEach(file => {
        try {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        } catch (unlinkErr) {
          console.error("Error deleting temp file:", unlinkErr);
        }
      });

      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error: any) {
      console.error("Nodemailer Error:", error);
      return res
        .status(500)
        .json({ message: error.message || "Server error sending email." });
    }
  });
}
