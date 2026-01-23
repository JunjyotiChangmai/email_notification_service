import nodemailer  from "nodemailer";
import { SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_HOST, SMTP_SECURE } from "../config.js";

export const transporter  = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS, 
    },
})