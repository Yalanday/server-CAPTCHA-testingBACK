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
exports.deleteUser = exports.getAllUsers = void 0;
const userQueryRepositories_1 = require("../../repositories/userQueryRepositories");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userQueryRepositories_1.getAllUsersData)();
        res.json(users);
    }
    catch (error) {
        console.error('❌ Failed to fetch users:', error);
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }
    try {
        yield (0, userQueryRepositories_1.deleteUserData)(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});
exports.deleteUser = deleteUser;
