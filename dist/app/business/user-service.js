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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBusinessLogic = exports.addUserBusinessLogic = void 0;
const user_services_1 = require("../repositories/user-services");
const validation_1 = require("./business-helpers/validation");
const addUserBusinessLogic = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
    }
    if (!validation_1.Validation.email(email)) {
        throw new Error('Invalid email');
    }
    if (!validation_1.Validation.password(password)) {
        throw new Error('Invalid password');
    }
    return yield (0, user_services_1.addUserToDB)(name, email, password);
});
exports.addUserBusinessLogic = addUserBusinessLogic;
const updateUserBusinessLogic = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_services_1.updateUserData)(id, name, email);
});
exports.updateUserBusinessLogic = updateUserBusinessLogic;
