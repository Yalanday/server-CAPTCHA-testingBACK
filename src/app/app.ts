import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import {connectToDB} from "../db/db";
import {Routes} from "../types/types";
import session from "express-session";

export class AppClass {
    app: express.Application;
    PORT: number | string;

    constructor(port: number, corsOptions: cors.CorsOptions) {
        this.app = express();
        this.app.use(session({
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
        this.initializeMiddleware();
        this.setConfigCors(corsOptions);
        this.PORT = process.env.PORT || port;
    }

    // Метод для настройки middleware
    private initializeMiddleware = () => this.app.use(express.json());

    private setConfigCors = (configurations: cors.CorsOptions) => this.app.use(cors(configurations));


// Метод для запуска сервера
    startServer = async () => {
        try {
            await connectToDB();

            this.app.listen(this.PORT, () => {
                console.log(`Server is running on port ${this.PORT}`);
            });

            // Обработчик ошибок - добавляем после запуска сервера
            this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
                res.status(500).json({message: 'Something went wrong', error: err.message});
            });

        } catch (error) {
            console.error('Error starting server:', error);
            process.exit(1);  // Завершаем процесс с кодом ошибки
        }
    };

    public autoRegisterRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app[route.method](route.path, route.handler);
        });
    }
}
