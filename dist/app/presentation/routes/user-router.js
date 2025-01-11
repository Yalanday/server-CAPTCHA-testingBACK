"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userQuerryControllers_1 = require("../controllers/userQuerryControllers");
const user_controllers_1 = require("../controllers/user-controllers");
const userRoutes = [
    { method: 'get', path: '/users', handler: userQuerryControllers_1.getAllUsers },
    { method: 'post', path: '/users', handler: user_controllers_1.addUser },
    { method: 'delete', path: '/users/:id', handler: userQuerryControllers_1.deleteUser },
    { method: 'put', path: '/users/:id', handler: user_controllers_1.updateUser }
];
exports.default = userRoutes;
