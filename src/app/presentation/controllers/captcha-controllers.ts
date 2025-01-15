import {Request, Response} from 'express';
import {NextFunction} from "express";
import {generateCaptcha} from "../../generateCaptcha";
import {addUserToDB, loginUserBD} from "../../repositories/userRepositories";
import {generateToken} from "../presentation-helpers/generate-token";
import jwt from 'jsonwebtoken';
import type {Captcha} from "../../../types/types";


const tempStorage = new Map();

export const getCaptcha = async (req: Request, res: Response, next: NextFunction): Promise<boolean> => {
    const captcha: Captcha = generateCaptcha();
    const secretKey = 'your_jwt_secret_key';
    const tokenExpiration = '5m';

    const intermediateToken = jwt.sign(
        { email: req.body.email, captchaText: captcha.text, isInLogin: req.body.isInLogin },
        secretKey,
        { expiresIn: tokenExpiration }
    );

    tempStorage.set(req.body.email, { password: req.body.password, token: intermediateToken });

    res.type('svg');
    res.status(200).json({
        captchaSvg: captcha.data,
        token: intermediateToken,
        expiresIn: tokenExpiration,
    });
    return true;
};

export const postCaptcha = async (req, res) => {
    const userCaptchaText = req.body.captchaText;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Токен отсутствует' });
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'your_jwt_secret_key');
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Неверный или истекший токен' });
    }

    console.log(decodedToken.isInLogin)

    const correctCaptchaText = decodedToken.captchaText;

    if (userCaptchaText === correctCaptchaText) {
        let userId;

        const storedData = tempStorage.get(decodedToken.email);

        if (!storedData) {
            return res.status(401).json({ success: false, message: 'Данные не найдены в хранилище' });
        }

        const password = storedData.password;

        if (decodedToken.isInLogin) {
            userId = await loginUserBD(decodedToken.email, password);
        } else {
            userId = await addUserToDB(decodedToken.email, password);
        }

        const newToken = generateToken(userId, decodedToken.email);
        res.status(201).json({
            message: 'Каптча корректна',
            userId,
            token: newToken,
        });
        return true;
    } else {
        res.status(400).json({ success: false, message: 'Captcha is incorrect' });
        return false;
    }
};
