"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initHandler = (req, res) => {
    res.send(`<h1>Hello, Worddd!</h1>`);
};
const initRoutes = [
    { method: 'get', path: '/', handler: initHandler },
];
exports.default = initRoutes;
