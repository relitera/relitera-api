"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownError = void 0;
class UnknownError {
    constructor(server_message, client_message, statusCode) {
        this.server_message = server_message;
        this.client_message = client_message;
        this.statusCode = statusCode;
    }
    static create(server_message, client_message, statusCode) {
        return new UnknownError(server_message, client_message, statusCode || 500);
    }
    throwErr() {
        throw this.presentOutput();
    }
    presentOutput() {
        return {
            server_message: this.server_message || "An error occurred while processing the request.",
            client_message: this.client_message || "An error occurred, please try again later.",
            statusCode: this.statusCode || 400,
        };
    }
}
exports.UnknownError = UnknownError;
