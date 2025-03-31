import MailService from "@/service/MailService.js";
import { IReqPostEmailSend } from "../../../types/email/index.js";
import { helperValidationRequest } from "@/helper/helperValidationRequest.js";
import dotenv from 'dotenv';
import type { TErrorValidation } from "@/types/index.js";
import type { Request, Response } from "express";

dotenv.config();


 /** `Сервис работы с почтой.` */
class EmailService {

     /** `Отпрвка почты.` */
    async send(req: Request<{}, {}, IReqPostEmailSend>, res: Response<TErrorValidation>) {
        try {
            const data = req.body;

            const resultValidation = helperValidationRequest(req);
            if(resultValidation) return res.status(400).send(resultValidation); 

            await MailService.sendMail({email: data.email, message: data.msg});
            return res.status(200).send({send: 'ok'}); 
        } catch (error) {
            const location = '[EmailService.send]';
            console.error(`Error in ${location} >>>`, error);
            return res.status(500).send( {error:`Error 500`, discription: `Ошибка сервера, попробуйте позже. ${location}`});
        }
    }

}

export default new EmailService();