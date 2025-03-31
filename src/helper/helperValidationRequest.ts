import { Request } from "express";
import { validationResult } from "express-validator";
import type { IError, TErrorValidation } from "@/types/index.js";


/**
 * Валидация входяших данных req.body
 * @return
 * - or: IErrorValidation (если есть ошибки)
 * - or: null (если нет ошибок)
 */
export const helperValidationRequest = (req: Request): TErrorValidation | null => {
    /** 
      * `Обьект с ошибками. `
      * - ключ значения: это имя валидируемого поля.
      * - значение: это сообщение о полученной ошибке. 
      * @example
      * {
      *     'email': 'Не коректный email.',
      *     'password': 'Не правильный пароль.'
      * }
      */
    const errors: Record<string, string> = {};
    const errorsValidation = validationResult(req);
    if(!errorsValidation.isEmpty()) {
        const arrayError = errorsValidation.array();
        if(arrayError.length > 0) {
            arrayError.forEach(item => {
                if('path' in item) {
                    errors[item.path] = item.msg;
                }
            });
            return errors;
        }
        return {error:`Не прошло валидацию`}; 
    }
    return null;
}