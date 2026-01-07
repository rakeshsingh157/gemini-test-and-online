import nodemailer from 'nodemailer';
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS
    }
});

export class EmailService {
    static async sendAlert(subject, text, html) {
        if (!ENV.EMAIL_USER || !ENV.EMAIL_PASS) {
            console.log("⚠️ Creds missing. EMAIL SIMULATION:");
            console.log(`SUBJECT: ${subject}`);
            console.log("--- HTML CONTENT ---");
            console.log(html ? html.substring(0, 200) + "..." : "No HTML");
            return;
        }

        try {
            await transporter.sendMail({
                from: ENV.EMAIL_USER,
                to: ENV.RECIPIENT_EMAIL,
                subject: subject,
                text: text, // Fallback
                html: html  // Rich content
            });
            console.log(`📧 Cyber-Email sent: ${subject}`);
        } catch (error) {
            console.error("❌ Failed to send email:", error.message);
        }
    }
}
