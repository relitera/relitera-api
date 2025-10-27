"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoRecordsFoundError = void 0;
class NoRecordsFoundError {
    constructor(server_message, client_message, statusCode, recordName) {
        this.server_message = server_message;
        this.client_message = client_message;
        this.statusCode = statusCode;
        this.recordName = recordName;
    }
    static create(server_message, client_message, statusCode, recordName) {
        return new NoRecordsFoundError(server_message, client_message, statusCode, recordName);
    }
    throwErr() {
        throw this.presentOutput();
    }
    presentOutput() {
        return {
            server_message: this.server_message || "An error occurred, please try again later.",
            client_message: this.client_message || "An error occurred, please try again later.",
            statusCode: this.statusCode || 400,
            recordName: this.recordName || ""
        };
    }
}
exports.NoRecordsFoundError = NoRecordsFoundError;
