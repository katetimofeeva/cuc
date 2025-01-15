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
        subject: "New request from a client",
        text: `Name: ${name}\nPhone: ${phone}`,
      };

      // Отправка письма
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Server error sending email." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
