import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
dotenv.config();
import { IMessage } from '@/types/service/EmailService';



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
    async sendMail(message: IMessage) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_EMAIL_TO,
            subject: 'Письмо с формы kebikov.com',
            html: `
                <div>
                    <h2>Почта отправителя: ${message.email}</h2>
                    <h3>${message.message}</h3>
                </div>
            `
        });
    }

}

export default new MailService();
