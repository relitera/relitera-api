import { Error } from "./error"

export class UnknownError implements Error {
    private constructor(private readonly server_message?: string, private readonly client_message?: string, private readonly statusCode?: number) {}

    public static create(server_message?: string, client_message?: string, statusCode?: number) {
        return new UnknownError(server_message, client_message, statusCode || 500)
    }

    public throwErr() {
        throw this.presentOutput()
    }

    private presentOutput() {
        return {
            server_message: this.server_message || "An error occurred while processing the request.",
            client_message: this.client_message || "An error occurred, please try again later.",
            statusCode: this.statusCode || 400,
        }
    }
}