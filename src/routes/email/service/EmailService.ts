import type { Request, Response } from "express";
import MailService from "@/service/MailService";
import { ReqPostEmailSend } from "../types";
import { helperValidationRequest } from "@/helper/helperValidationRequest";
import dotenv from 'dotenv';

dotenv.config();


 /** `Сервис работы с почтой.` */
class EmailService {

     /** `Отпрвка почты.` */
    async send(req: Request<{}, {}, ReqPostEmailSend>, res: Response) {
        try {
            const data = req.body;

            const resultValidation = helperValidationRequest(req);
            if(resultValidation) return res.status(400).send(resultValidation); 

            await MailService.sendMail(data.msg);
            return res.status(200).send({msg: 'ok'}); 
        } catch (error) {
            const location = '[EmailService.send]';
            console.error(`Error in ${location} >>>`, error);
            return res.status(500).send( {error:`Error 500`, discription: `Ошибка сервера, попробуйте позже. ${location}`});
        }
    }

}

export default new EmailService();