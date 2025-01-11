import {Routes} from "../../../types/types";
import initRoutes from "./init-router";
import userRoutes from "./user-router";
import {captchaRoutes} from "./captcha-router";

const routes: Routes[] = [...initRoutes, ...userRoutes, ...captchaRoutes];

export default routes;
