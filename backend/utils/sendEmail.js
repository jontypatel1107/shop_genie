import nodemailer from "nodemailer";

let transporter;

const createTransporter = async () => {
  if (process.env.ETHEREAL_EMAIL && process.env.ETHEREAL_PASSWORD) {
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("No SMTP configured. Using Ethereal test account...");
    const testAccount = await nodemailer.createTestAccount();
    console.log("Ethereal test account created:", testAccount.user);
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    return transporter;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

let emailTransporter = null;

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    if (!emailTransporter) {
      emailTransporter = await createTransporter();
    }

    const info = await emailTransporter.sendMail({
      from: `"ShopGenie" <${process.env.SMTP_USER || "noreply@shopgenie.com"}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("\n========================================");
    console.log("EMAIL SENT SUCCESSFULLY!");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    console.log("========================================\n");

    return true;
  } catch (error) {
    console.error("\n========================================");
    console.error("EMAIL SEND FAILED!");
    console.error("Error:", error.message);
    console.error("========================================\n");
    return false;
  }
};

export const sendOTP = async (to, code) => {
  return sendEmail({
    to,
    subject: "ShopGenie - Your OTP Code",
    text: `Your OTP code is: ${code}`,
    html: `
      <h1>ShopGenie - Your OTP Code</h1>
      <p>Your verification code is:</p>
      <h2 style="font-size: 48px; letter-spacing: 8px; color: #0f756b;">${code}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
  });
};