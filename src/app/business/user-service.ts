import {Validation} from "./business-helpers/validation";
import {NextFunction, Request, Response} from "express";
import {UserRequestBody} from "../../types/types";
import {getCaptcha} from "../presentation/controllers/captcha-controllers";

const validateUserCredentials = (email: string, password: string): void => {
    if (!email || !password) {
        throw new Error('Email и пароль обязательны');
    }

    if (!Validation.email(email)) {
        throw new Error('Неверный формат email');
    }

    if (!Validation.password(password)) {
        throw new Error('Неверный формат пароля');
    }
};


export const addUserBusinessLogic = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction, email: string, password: string): Promise<void> => {
    validateUserCredentials(email, password)
    await getCaptcha(req, res, next);
}

export const loginUserBusinessLogic = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction, email: string, password: string): Promise<void> => {
    validateUserCredentials(email, password)
    await getCaptcha(req, res, next);
}

