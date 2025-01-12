import {Request, Response} from 'express';
import {NextFunction} from "express";
import {Captcha, generateCaptcha} from "../../generateCaptcha";
import {addUserToDB, loginUserBD} from "../../repositories/userRepositories";
import {generateToken} from "../presentation-helpers/generate-token";

export const sessionDataAfter = {
    sessionCaptchaText: '',
     sessionCaptchaEmail: '',
    sessionCaptchaPassword: '',
    isRegister: false
}

export const getCaptcha = async (req: Request, res: Response, next: NextFunction): Promise<boolean> => {
    const captcha: Captcha = generateCaptcha();
    req.session.captchaText = captcha.text;  // Сохраняем текст капчи в сессии
    sessionDataAfter.sessionCaptchaText = captcha.text;
    try {
        await new Promise<void>((resolve, reject) => {
            req.session.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    } catch (err) {
        console.error('Ошибка сохранения сессии:', err);
        return false;
    }

    res.type('svg');
    res.status(200).send(captcha.data);
    return true;
}


export const postCaptcha = async (req: Request, res: Response, next: NextFunction): Promise<boolean> => {
    const userCaptchaText = req.body.captchaText; // Получаем текст капчи от пользователя

    console.log(userCaptchaText)

    console.log(sessionDataAfter)


    let correctCaptchaText = req.session.captchaText; // Получаем правильный текст из сессии

    if (correctCaptchaText === undefined) {
        console.log('меняем каптчу')
        correctCaptchaText = sessionDataAfter.sessionCaptchaText;
        req.session.sessionEmail = sessionDataAfter.sessionCaptchaEmail;
        req.session.sessionPassword = sessionDataAfter.sessionCaptchaPassword;
        sessionDataAfter.isRegister ? req.session.isInLogin = false: req.session.isInLogin = true;
    }

    console.log('Это сохраненная каптча', sessionDataAfter.sessionCaptchaText)
    console.log('Это сохрвненный емайлю' , req.session.sessionEmail)
    console.log('Это сохраненный пароль' , req.session.sessionPassword)
    console.log('Это вход в систему' , req.session.isInLogin)

    console.log('это userCaptchaText',  userCaptchaText)
    console.log('это correctCaptchaText',  correctCaptchaText)

    // Сравниваем тексты
    if (userCaptchaText === correctCaptchaText) {
        let userId: number;

        console.log('1:', userCaptchaText === correctCaptchaText)

        if (req.session.isInLogin) {
            console.log('ЕБАНЫЙ ЛОГИН')
            userId = await loginUserBD(req.session.sessionEmail, req.session.sessionPassword)
            req.session.isInLogin = false;
        } else {
            console.log('хуева рега')
            userId = await addUserToDB(req.session.sessionEmail, req.session.sessionPassword);
        }

        const token = generateToken(userId, req.session.sessionEmail);
        res.status(201).json({message: 'Каптча корректна', userId, token});
        return true
    } else {
        res.status(400).json({success: false, message: 'Captcha is incorrect'});
        return false
    }
};
