"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
class InvalidTokenError {
    constructor(server_message, client_message, statusCode, param) {
        this.server_message = server_message;
        this.client_message = client_message;
        this.statusCode = statusCode;
        this.param = param;
    }
    static create(server_message, client_message, statusCode, param) {
        return new InvalidTokenError(server_message, client_message, statusCode, param);
    }
    throwErr() {
        throw this.presentOutput();
    }
    presentOutput() {
        return {
            server_message: this.server_message || "Token invalid or expired.",
            client_message: this.client_message || "Token invalid or expired.",
            statusCode: this.statusCode || 401,
            param: this.param || "Token"
        };
    }
}
exports.InvalidTokenError = InvalidTokenError;
