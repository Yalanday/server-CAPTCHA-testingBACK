"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = require("../../services/user-services");
const user_service_1 = require("../../business/user.service");
const userQuerryControllers_1 = require("../controllers/userQuerryControllers");
const userRoutes = [
    { method: 'get', path: '/users', handler: user_services_1.getAllUsers },
    { method: 'post', path: '/users', handler: user_services_1.addUser },
    { method: 'delete', path: '/users/:id', handler: userQuerryControllers_1.deleteUser },
    { method: 'put', path: '/users/:id', handler: user_service_1.updateUser }
];
exports.default = userRoutes;
