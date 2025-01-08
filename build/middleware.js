"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("./index");
function auth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ msg: "Token Missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, index_1.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(403).json({ msg: "Invalid credentials" });
    }
}
