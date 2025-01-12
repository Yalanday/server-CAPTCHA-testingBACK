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
                secure: false,
                sameSite: 'none',
                maxAge: 3600000,
            }
        }));
        this.initializeMiddleware();
        this.setConfigCors(corsOptions);
        this.PORT = process.env.PORT || port;
    }

    private initializeMiddleware = () => this.app.use(express.json());
    private setConfigCors = (configurations: cors.CorsOptions) => this.app.use(cors(configurations));

    startServer = async () => {
        try {
            await connectToDB();

            this.app.listen(this.PORT, () => {
                console.log(`Server is running on port ${this.PORT}`);
            });

            this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
                res.status(500).json({message: 'Something went wrong', error: err.message});
            });

        } catch (error) {
            console.error('Error starting server:', error);
            process.exit(1);
        }
    };

    public autoRegisterRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app[route.method](route.path, route.handler);
        });
    }
}
