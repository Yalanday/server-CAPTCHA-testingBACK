import {addUserToDB, loginUserBD, updateUserData} from "../repositories/userRepositories";
import {Validation} from "./business-helpers/validation";
import {NextFunction, Request, Response} from "express";
import {UserRequestBody} from "../../types/types";
import {getCaptcha, postCaptcha} from "../presentation/controllers/captcha-controllers";
import bcrypt from "bcrypt";

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
    console.log(req.session.sessionPassword)
    await getCaptcha(req, res, next);
}

export const loginUserBusinessLogic = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction, email: string, password: string): Promise<void> => {
    validateUserCredentials(email, password)
    console.log(req.session.sessionPassword)
    await getCaptcha(req, res, next);
}

export const updateUserBusinessLogic = async (id: string, name: string, email: string): Promise<void> => {
    await updateUserData(id, email);
}

