import { Router } from "express";
import EmailService from "../service/EmailService.js";
import { body } from "express-validator";

const router = Router({mergeParams: true});


router.post('/send',
    body('email').isEmail().withMessage('Не коректный email.'),
    body('msg').notEmpty().withMessage('Пустое сообщение.'),
    body('check')
        .custom((value: unknown) => {
            if(isNaN(Number(value)) && Number(value) !== 5) throw new Error('Не правильный ответ.');
            return true;
        }), 
    EmailService.send
);

export default router;