import { Error } from "./error"

export class InvalidParamError implements Error {
    private constructor(private readonly client_message: string, private readonly server_message: string, private readonly statusCode?: number, private readonly param?: string) {}

    public static create(client_message: string, server_message: string, statusCode?: number, param?: string) {
        return new InvalidParamError(client_message, server_message, statusCode, param)
    }

    public throwErr() {
        throw this.presentOutput()
    }

    private presentOutput() {
        return {
            client_message: this.client_message || "An error occurred, please try again later.",
            server_message: this.server_message || "An error occurred, please try again later.",
            statusCode: this.statusCode || 400,
            param: this.param || ""
        }
    }
}