"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
class Validation {
    static email(email) {
        return this.emailRegex.test(email);
    }
    static password(password) {
        return this.passwordRegex.test(password);
    }
}
exports.Validation = Validation;
Validation.emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
Validation.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
Validation.emailResult = {
    message: 'Invalid email format',
    tips: [
        'Email должен содержать символ "@"',
        'Email должен содержать доменное имя (например, mail.com)',
        'Email должен содержать допустимые символы (буквы, цифры, точки, дефисы и подчеркивания)'
    ]
};
Validation.passwordResult = {
    message: 'Invalid password',
    tips: [
        'Пароль должен содержать минимум 8 символов',
        'Пароль должен содержать хотя бы одну строчную букву',
        'Пароль должен содержать хотя бы одну цифру',
        'Пароль должен содержать хотя бы один специальный символ (например, @$!%*?&)'
    ]
};
