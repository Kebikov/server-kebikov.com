import { Router } from 'express';
import email from '@routes/email/controllers/email_controllers.js';

const router = Router({mergeParams: true});  


router.use('/email', email);  

export default router;



