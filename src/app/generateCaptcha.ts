import svgCaptcha from 'svg-captcha';
import fs from 'fs';
import {Captcha} from "../types/types";



// Функция для генерации капчи и сохранения в файл
export const generateCaptcha = (): Captcha => {
    // Генерация капчи с параметрами
    const captcha: Captcha = svgCaptcha.create({
        size: 6,         // Длина строки
        ignoreChars: '0o1i',  // Игнорируем похожие символы
        width: 250,      // Ширина картинки
        height: 100,      // Высота картинки
        color: true,     // Цвет текста
        background: '#fff', // Цвет фона
        noise: 2,        // Количество шума
        fontSize: 70,    // Размер шрифта
    });

    // Выводим сгенерированную капчу в консоль
    console.log('Generated captcha text:', captcha.text);

    // Сохраняем SVG в файл
    fs.writeFileSync('captcha.svg', captcha.data);

    console.log('Captcha saved to captcha.svg');

    return captcha
};




