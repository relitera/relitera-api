"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = void 0;
class InvalidParamError {
    constructor(client_message, server_message, statusCode, param) {
        this.client_message = client_message;
        this.server_message = server_message;
        this.statusCode = statusCode;
        this.param = param;
    }
    static create(client_message, server_message, statusCode, param) {
        return new InvalidParamError(client_message, server_message, statusCode, param);
    }
    throwErr() {
        throw this.presentOutput();
    }
    presentOutput() {
        return {
            client_message: this.client_message || "An error occurred, please try again later.",
            server_message: this.server_message || "An error occurred, please try again later.",
            statusCode: this.statusCode || 400,
            param: this.param || ""
        };
    }
}
exports.InvalidParamError = InvalidParamError;
