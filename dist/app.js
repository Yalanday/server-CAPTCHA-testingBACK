"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppClass = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db/db");
class AppClass {
    constructor(port, corsOptions) {
        // Метод для настройки middleware
        this.initializeMiddleware = () => this.app.use(express_1.default.json());
        this.setConfigCors = (configurations) => this.app.use((0, cors_1.default)(configurations));
        // Метод для запуска сервера
        this.startServer = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, db_1.connectToDB)();
                this.app.listen(this.PORT, () => {
                    console.log(`Server is running on port ${this.PORT}`);
                });
                // Обработчик ошибок - добавляем после запуска сервера
                this.app.use((err, req, res, next) => {
                    res.status(500).json({ message: 'Something went wrong', error: err.message });
                });
            }
            catch (error) {
                console.error('Error starting server:', error);
                process.exit(1); // Завершаем процесс с кодом ошибки
            }
        });
        this.app = (0, express_1.default)();
        this.initializeMiddleware();
        this.setConfigCors(corsOptions);
        this.PORT = process.env.PORT || port;
    }
    autoRegisterRoutes(routes) {
        routes.forEach(route => {
            this.app[route.method](route.path, route.handler);
        });
    }
}
exports.AppClass = AppClass;
