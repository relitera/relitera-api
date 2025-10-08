import { Error } from "./error"

export class NoRecordsFoundError implements Error {
    private constructor(private readonly server_message?: string, private readonly client_message?: string, private readonly statusCode?: number, private readonly recordName?: string) {}

    public static create(server_message?: string, client_message?: string, statusCode?: number, recordName?: string) {
        return new NoRecordsFoundError(server_message, client_message, statusCode, recordName)
    }

    public throwErr() {
        throw this.presentOutput()
    }

    private presentOutput() {
        return {
            server_message: this.server_message || "An error occurred, please try again later.",
            client_message:  this.client_message || "An error occurred, please try again later.",
            statusCode: this.statusCode || 400,
            recordName: this.recordName || ""
        }
    }
}