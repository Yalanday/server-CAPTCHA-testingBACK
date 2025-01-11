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
exports.updateUserData = exports.addUserToDB = void 0;
const db_1 = require("../../db/db");
const addUserToDB = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield (0, db_1.connectToDB)();
        const [result] = yield connection.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        return result.insertId;
    }
    catch (error) {
        throw error;
    }
    finally {
        if (connection) {
            try {
                yield connection.end();
            }
            catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }
        }
    }
});
exports.addUserToDB = addUserToDB;
const updateUserData = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield (0, db_1.connectToDB)();
        yield connection.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    }
    catch (error) {
        throw error;
    }
    finally {
        if (connection) {
            try {
                yield connection.end();
            }
            catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }
        }
    }
});
exports.updateUserData = updateUserData;
