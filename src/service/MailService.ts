import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
dotenv.config();

class MailService {
    public transporter: nodemailer.Transporter;

    constructor() {
        /**
         * Настройки для отправки.
         */
        const option: SMTPTransport.Options = {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        }

        this.transporter = nodemailer.createTransport(option);
    }

    /**
     * Отправка письма на email.
     * @param to Email для отправки, кому отправляем.
     * @param link Ссылка для активации.
     * @example await sendMail(to: string, link: string);
     */
    async sendMail(msg: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_EMAIL_TO,
            subject: 'Письмо с формы kebikov.com',
            text: msg
        });
    }

}

export default new MailService();
