// session.d.ts
import { SessionData } from 'express-session';

// Расширяем тип сессии
declare module 'express-session' {
    interface SessionData {
        captchaText: string;  // Добавляем свойство captchaText
    }
}
