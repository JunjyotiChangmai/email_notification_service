import nodemailer  from "nodemailer";
import { SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_HOST } from "../config.js";

export const transporter  = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS, 
    },
})

export const verifySMTP = async () => {
  await transporter.verify();
  console.log("SMTP server is ready");
};