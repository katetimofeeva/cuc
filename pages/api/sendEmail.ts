import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, phone } = req.body;

    // Настройка транспортера Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Или другой сервис, например, Outlook, SMTP и т.д.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // Настройка параметров письма
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Кому отправлять сообщения
        subject: "Новая заявка от клиента",
        text: `Имя: ${name}\nТелефон: ${phone}`,
      };

      // Отправка письма
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email успешно отправлен!" });
    } catch (error) {
      console.error("Ошибка при отправке email:", error);
      res.status(500).json({ message: "Ошибка сервера при отправке email." });
    }
  } else {
    res.status(405).json({ message: "Метод не разрешен." });
  }
}
