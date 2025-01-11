import {getCaptcha, postCaptcha} from "../controllers/captcha-controllers";
import {Routes} from "../../../types/types";

export const captchaRoutes: Routes[] = [
    {method: 'get', path: '/api/captcha', handler: getCaptcha},
    {method: 'post', path: '/api/captcha', handler: postCaptcha},
]
