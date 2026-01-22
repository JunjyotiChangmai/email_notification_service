import { SMTP_USER } from "../config.js";
import { transporter } from "../services/smtp_service.js";

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
