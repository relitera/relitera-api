"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptorBcrypt = void 0;
const config_1 = __importDefault(require("../../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class EncryptorBcrypt {
    constructor() { }
    static create() {
        return new EncryptorBcrypt();
    }
    async encrypt(stringToEncrypt) {
        const salt = await bcrypt_1.default.genSalt(config_1.default.saltRounds);
        const hashedPassword = await bcrypt_1.default.hash(stringToEncrypt, salt);
        return hashedPassword;
    }
    async compare(encrypted, rawString) {
        const isEqual = await bcrypt_1.default.compare(rawString, encrypted);
        if (!isEqual)
            return false;
        return true;
    }
}
exports.EncryptorBcrypt = EncryptorBcrypt;
