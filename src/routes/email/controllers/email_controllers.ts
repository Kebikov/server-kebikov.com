import { Router } from "express";
import EmailService from "../service/EmailService.js";
import { body } from "express-validator";

const router = Router({mergeParams: true});


router.post('/send',
    body('email').isEmail().withMessage('Не коректный email.'),
    body('msg').notEmpty().withMessage('Пустое сообщение.'),
    body('check')
        .isNumeric().withMessage('Вы ввели не число.')
        .custom((value: number) => {
            if(value !== 5) throw new Error('Не правильный ответ.')
        }), 
    EmailService.send
);

export default router;