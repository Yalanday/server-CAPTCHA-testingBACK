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
exports.updateUser = void 0;
const user_services_1 = require("../services/user-services");
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }
    try {
        yield (0, user_services_1.updateUserData)(req.params.id, req.body.name, req.body.email);
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error('❌ Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});
exports.updateUser = updateUser;
