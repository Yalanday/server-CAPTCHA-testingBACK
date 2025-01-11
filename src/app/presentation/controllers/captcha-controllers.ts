import {Request, Response} from 'express';
import {NextFunction} from "express";
import {Captcha, generateCaptcha} from "../../generateCaptcha";
import {addUserToDB, loginUserBD} from "../../repositories/userRepositories";
import {generateToken} from "../presentation-helpers/generate-token";

export const getCaptcha = async (req: Request, res: Response, next: NextFunction): Promise<boolean> => {
    const captcha: Captcha = generateCaptcha();
    req.session.captchaText = captcha.text;  // Сохраняем текст капчи в сессии
    req.session.save((err) => {
            if (err) {
                console.error('Ошибка сохранения сессии:', err);
            }
        }
    );
    res.type('svg');
    res.status(200).send(captcha.data);
    return true;
}

export const postCaptcha = async (req: Request, res: Response, next: NextFunction): Promise<boolean> => {
    const userCaptchaText = req.body.captchaText; // Получаем текст капчи от пользователя
    const correctCaptchaText = req.session.captchaText; // Получаем правильный текст из сессии

    // Сравниваем тексты
    if (userCaptchaText === correctCaptchaText) {
        let userId: number;

        if (req.session.isInLogin) {
            userId = await loginUserBD(req.session.sessionEmail, req.session.sessionPassword)
            req.session.isInLogin = false;
        } else {
            userId = await addUserToDB(req.session.sessionEmail, req.session.sessionPassword);
        }

        const token = generateToken(userId, req.session.sessionEmail);
        res.status(201).json({message: 'Каптча корректна, пользователь добавлен', userId, token});
        return true
    } else {
        res.status(400).json({success: false, message: 'Captcha is incorrect'});
        return false
    }
};
