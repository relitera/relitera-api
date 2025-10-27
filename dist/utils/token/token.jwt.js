"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
class TokenJWT {
    constructor() { }
    static create() {
        return new TokenJWT();
    }
    async generate(data) {
        if (data && config_1.default.tokenKey) {
            const token = await jsonwebtoken_1.default.sign(data, config_1.default.tokenKey);
            return token;
        }
    }
    async decode(token) {
        if (token && config_1.default.tokenKey) {
            try {
                const decoded = await jsonwebtoken_1.default.verify(token, config_1.default.tokenKey);
                return decoded;
            }
            catch (error) {
                console.error("Token verification failed:", error);
                return undefined;
            }
        }
        return undefined;
    }
}
exports.TokenJWT = TokenJWT;
