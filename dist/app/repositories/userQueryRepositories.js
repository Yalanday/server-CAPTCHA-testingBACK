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
exports.getAllUsersData = exports.deleteUserData = void 0;
const db_1 = require("../../db/db");
const deleteUserData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield (0, db_1.connectToDB)();
        yield connection.execute('DELETE FROM users WHERE id = ?', [id]);
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
exports.deleteUserData = deleteUserData;
const getAllUsersData = () => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield (0, db_1.connectToDB)();
        const [rows] = yield connection.execute('SELECT * FROM users');
        return rows;
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
exports.getAllUsersData = getAllUsersData;
