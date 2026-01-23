import { SMTP_USER } from "../config.js";
import { transporter } from "../services/smtp_service.js";
import { resend } from "../services/resend_email_service.js";

export async function sendEmail(req, res) {
    try {
        const { to, subject, message, html } = req.body;

        if (!to || !subject || (!message && !html)) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const info = await transporter.sendMail({
            from: `"Trackmail" <${SMTP_USER}>`,
            to,
            subject,
            text: message || " ",
            html: html,
        });

        res.json({
            success: true,
            message: "Email sent successfully",
            messageId: info.messageId,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


export async function sendNotification(req, res) {
    try {
        const { to, subject, message, html } = req.body;

        if (!to || !subject || (!message && !html)) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const { data, error } = await resend.emails.send({
            from: "Trackmail <onboarding@resend.dev>",
            to: to,
            subject: subject,
            html,
            text: message
        });

        if (error) {
            console.log("error in sending email: ", error);
            return res.status(400).json({ error });
        }

        console.log("Email send successfully");
        res.json({
            success: true,
            messageId: data.id
        });

    } catch (err) {
        console.log("error in sending email: ", err.message)
        res.status(500).json({ error: err.message });
    }
}