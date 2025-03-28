import { Router } from "express";
import EmailService from "../service/EmailService";
import { body } from "express-validator";

const router = Router({mergeParams: true});


router.post('/send',
    body('email', 'Не коректный email.').isEmail(),
    body('msg', 'Пустое сообщение.').notEmpty(),
    EmailService.send
);

export default router;