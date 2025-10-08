import { Error } from "./error"

export class InvalidTokenError implements Error {
    private constructor(private readonly server_message?: string, private readonly client_message?: string, private readonly statusCode?: number, private readonly param?: string) {}

    public static create(server_message?: string, client_message?: string, statusCode?: number, param?: string) {
        return new InvalidTokenError(server_message, client_message, statusCode, param)
    }

    public throwErr() {
        throw this.presentOutput()
    }

    private presentOutput() {
        return {
            server_message: this.server_message || "Token invalid or expired.",
            client_message: this.client_message || "Token invalid or expired.",
            statusCode: this.statusCode || 401,
            param: this.param || "Token"
        }
    }
}