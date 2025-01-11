"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId, email }, process.env.JWT_SECRET || 'defaultSecret', // Используйте переменную окружения
    { expiresIn: '1h' } // Токен истечет через час
    );
};
exports.generateToken = generateToken;
