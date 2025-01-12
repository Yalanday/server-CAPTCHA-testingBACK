const corsOption = {
    // origin: ['http://localhost:5173'],  // Разрешенные источники
    origin: ['', 'http://localhost:5172', 'http://localhost:5173'],  // Разрешенные источники
    methods: ['GET', 'POST', 'PUT', 'DELETE'],               // Разрешенные HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization'],        // Разрешенные заголовки
    credentials: true,                                        // Разрешить отправку cookies
    preflightContinue: false,                                  // Обработать OPTIONS-запросы по умолчанию
    optionsSuccessStatus: 204                                  // Статус для успешных preflight-запросов
};

export default corsOption;
