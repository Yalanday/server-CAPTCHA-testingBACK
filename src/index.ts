//config
import corsOption from "./config-files/cors";
import {port} from "./config-files/port";
// routes
import routes from "./app/presentation/routes";
// App
import {AppClass} from "./app/app";
import {Captcha, generateCaptcha} from "./app/generateCaptcha";
import {Request, Response} from "express";
import session from 'express-session';


const myApp = new AppClass(port, corsOption)

myApp.autoRegisterRoutes(routes);

myApp.startServer().catch((error) => {
    console.error('Unhandled Error:', error);
    process.exit(1); // Завершаем процесс при непойманной ошибке
})

myApp.app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, // Установите на true, если работаете в production с HTTPS
        sameSite: true, // Для разрешения cookies при кросс-доменном обмене
        maxAge: 3600000,  // 1 час
    }
}));


myApp.app.get('/api/captcha', (req: Request, res: Response) => {
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
});

myApp.app.post('/api/captcha', (req: Request, res: Response) => {
    const userCaptchaText = req.body.captchaText; // Получаем текст капчи от пользователя
    const correctCaptchaText = req.session.captchaText; // Получаем правильный текст из сессии

    // Сравниваем тексты
    if (userCaptchaText === correctCaptchaText) {
        res.status(200).json({success: true, message: 'Captcha is correct'});
    } else {
        res.status(400).json({success: false, message: 'Captcha is incorrect'});
    }
});
