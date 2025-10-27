"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserUsecase = void 0;
const InvalidParamError_1 = require("../../../errors/InvalidParamError");
const MissingParamError_1 = require("../../../errors/MissingParamError");
const NoRecordsFound_1 = require("../../../errors/NoRecordsFound");
class LoginUserUsecase {
    constructor(userGateway, encryptor, token) {
        this.userGateway = userGateway;
        this.encryptor = encryptor;
        this.token = token;
    }
    static create(userGateway, encryptor, token) {
        return new LoginUserUsecase(userGateway, encryptor, token);
    }
    async execute(loginData) {
        const { email, password } = loginData;
        if (!email) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Email not provided', 'Please provide your email', 400, 'Email');
            missingParamError.throwErr();
        }
        if (!password) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Password not provided', 'Please provide your password', 400, 'Password');
            missingParamError.throwErr();
        }
        const userFound = await this.userGateway.findByEmail(email.toLowerCase());
        if (!userFound.email.length) {
            const noRecordsFoundError = NoRecordsFound_1.NoRecordsFoundError.create("User account not found", 'Account not found', 400, 'user');
            noRecordsFoundError.throwErr();
        }
        const passwordsMatch = await this.encryptor.compare(userFound.password, password);
        if (!passwordsMatch) {
            const invalidParamError = InvalidParamError_1.InvalidParamError.create('Email or password invalid.', "Email or password user provided is invalid", 400, 'Email or password');
            invalidParamError.throwErr();
        }
        const token = await this.token.generate({
            email: userFound.email.toLowerCase(),
        });
        if (!token)
            throw new Error('Error generating token');
        await this.userGateway.updateToken(token, userFound.id);
        const output = this.presentOutput(userFound, token);
        return output;
    }
    presentOutput(user, token) {
        const output = {
            email: user.email,
            name: user.name,
            id: user.id,
            token: token,
            birthdate: user.birthdate
        };
        return output;
    }
}
exports.LoginUserUsecase = LoginUserUsecase;
