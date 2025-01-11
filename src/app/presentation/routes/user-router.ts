import {Routes} from "../../../types/types";
import {deleteUser, getAllUsers} from "../controllers/userQuerryControllers";
import {addUser, loginUser, updateUser} from "../controllers/user-controllers";

const userRoutes: Routes[] = [
    {method: 'get', path: '/users', handler: getAllUsers},
    {method: 'post', path: '/users/register', handler: addUser},
    {method: 'post', path: '/users/login', handler: loginUser},
    {method: 'delete', path: '/users/:id', handler: deleteUser},
    {method: 'put', path: '/users/:id', handler: updateUser}
];

export default userRoutes
