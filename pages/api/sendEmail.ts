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
  res: NextApiResponse,
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

    const getSingleValue = (val: any) => (Array.isArray(val) ? val[0] : val);

    const name = getSingleValue(fields.name) || "N/A";
    const phone = getSingleValue(fields.phone) || "N/A";
    const email = getSingleValue(fields.email) || "N/A";
    const questions = getSingleValue(fields.questions) || "No message";

    let uploadedFiles: any[] = [];
    if (files.files) {
      uploadedFiles = Array.isArray(files.files) ? files.files : [files.files];
    }

    const attachments = uploadedFiles
      .filter(file => file && file.filepath)
      .map(file => ({
        filename: file.originalFilename || `upload-${Date.now()}`,
        path: file.filepath,
      }));

    try {
      // 1. --- ОТПРАВКА В TELEGRAM ---
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        const messageText =
          `🚀 *New Quote Request*\n\n` +
          `👤 *Name:* ${name}\n` +
          `📞 *Phone:* ${phone}\n` +
          `📧 *Email:* ${email}\n` +
          `💬 *Message:* ${questions}`;

        if (attachments.length > 0) {
          // Для Node.js используем встроенные средства для формирования FormData
          const formData = new FormData();
          formData.append("chat_id", chatId);
          formData.append("caption", messageText);
          formData.append("parse_mode", "Markdown");

          // Читаем файл и создаем Blob для корректной отправки через fetch
          const fileBuffer = fs.readFileSync(attachments[0].path);
          const blob = new Blob([new Uint8Array(fileBuffer)], {
            type: "image/jpeg",
          });
          formData.append("photo", blob, attachments[0].filename);

          await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
            method: "POST",
            body: formData,
          });
        } else {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: "Markdown",
            }),
          });
        }
      }

      // 2. --- ОТПРАВКА НА ПОЧТУ ---
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Request: ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${questions}`,
        attachments,
      });

      // 3. --- ОЧИСТКА ВРЕМЕННЫХ ФАЙЛОВ ---
      attachments.forEach(file => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });

      return res.status(200).json({ message: "Success! Notification sent." });
    } catch (error: any) {
      console.error("Worker Error:", error);
      return res.status(500).json({ message: "Server error." });
    }
  });
}
