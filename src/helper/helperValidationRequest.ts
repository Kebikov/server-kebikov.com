import { Request } from "express";
import { validationResult } from "express-validator";
import type { IError } from "@/types";

/**
 * Валидация входяших данных req.body
 * @example
 *  const resultValidation = helperValidationRequest(req);
 *  if(resultValidation) return res.status(400).send(resultValidation);
 * @returns 
 * - Или type IError (если есть ошибки)
 * - Или null (если нет ошибок)
 */
export const helperValidationRequest = (req: Request): IError | null => {
    const errorsValidation = validationResult(req);
    if(!errorsValidation.isEmpty()) {
        const arrayError = errorsValidation.array();
        if(arrayError.length > 0) {
            const errorMsg = arrayError[0].msg;
            return {error: 'Не прошло валидацию', discription: errorMsg};
        }
        return {error:`Не прошло валидацию`, discription: 'Ошибка валидации входяших данных.'}; 
    }
    return null;
}