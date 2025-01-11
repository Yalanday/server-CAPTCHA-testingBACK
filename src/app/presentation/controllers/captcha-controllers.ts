import {Request, Response} from 'express';
import {NextFunction} from "express";
import {Captcha, generateCaptcha} from "../../generateCaptcha";

export const getCaptcha = async (req: Request, res: Response, next: NextFunction) => {
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
}

export const postCaptcha = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userCaptchaText = req.body.captchaText; // Получаем текст капчи от пользователя
    const correctCaptchaText = req.session.captchaText; // Получаем правильный текст из сессии

    // Сравниваем тексты
    if (userCaptchaText === correctCaptchaText) {
        res.status(200).json({success: true, message: 'Captcha is correct'});
    } else {
        res.status(400).json({success: false, message: 'Captcha is incorrect'});
    }
};
