import {Routes} from "../../../types/types";
import {addUser, loginUser} from "../controllers/user-controllers";

const userRoutes: Routes[] = [
    {method: 'post', path: '/users/register', handler: addUser},
    {method: 'post', path: '/users/login', handler: loginUser},
];

export default userRoutes
