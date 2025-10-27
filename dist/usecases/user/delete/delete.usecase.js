"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUsecase = void 0;
const MissingParamError_1 = require("../../../errors/MissingParamError");
class DeleteUserUsecase {
    constructor(userGateway) {
        this.userGateway = userGateway;
    }
    static create(userGateway) {
        return new DeleteUserUsecase(userGateway);
    }
    async execute(data) {
        if (!data.email) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Email is required', undefined, 400, 'email');
            missingParamError.throwErr();
        }
        const userDeleted = await this.userGateway.deleteByEmail(data.email.toLowerCase());
        const currentTimestamp = new Date();
        if (!userDeleted)
            throw new Error("User not found");
        const output = this.presentOutput({
            email: data.email,
            id: userDeleted.id,
            deleted_at: currentTimestamp
        });
        return output;
    }
    presentOutput(data) {
        const output = {
            email: data.email,
            deleted_at: data.deleted_at,
            id: data.id
        };
        return output;
    }
}
exports.DeleteUserUsecase = DeleteUserUsecase;
