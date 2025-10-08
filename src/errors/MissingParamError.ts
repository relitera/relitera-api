import { Error } from "./error"

export class MissingParamError implements Error {
    private constructor(private readonly server_message: string, private readonly client_message?: string,  private readonly statusCode?: number, private readonly param?: string) {}

    public static create(server_message: string, client_message?: string, statusCode?: number, param?: string) {
        return new MissingParamError(server_message, client_message, statusCode, param)
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