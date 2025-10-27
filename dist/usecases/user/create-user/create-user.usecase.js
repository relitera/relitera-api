"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUsecase = void 0;
const user_1 = require("../../../domain/user/entity/user");
const InvalidParamError_1 = require("../../../errors/InvalidParamError");
const MissingParamError_1 = require("../../../errors/MissingParamError");
class CreateUserUsecase {
    constructor(userGateway, emailValidator, encryptor, token) {
        this.userGateway = userGateway;
        this.emailValidator = emailValidator;
        this.encryptor = encryptor;
        this.token = token;
    }
    static create(userGateway, emailValidator, encryptor, token) {
        return new CreateUserUsecase(userGateway, emailValidator, encryptor, token);
    }
    async execute(userData) {
        const token = await this.token.generate({
            email: userData.email,
        });
        if (!token)
            throw new Error('Error generating token');
        if (!userData.email) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Email not provided', 'Please provide your email', 400, 'Email');
            missingParamError.throwErr();
        }
        const userFound = await this.userGateway.findByEmail(userData.email.toLowerCase());
        if (userFound.id && userFound.id.length) {
            const invalidParamError = InvalidParamError_1.InvalidParamError.create('Account already exists', 'User provided an email thats already linked to an account', 400, 'Email');
            invalidParamError.throwErr();
        }
        if (!userData.birthdate) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Birthdate not provided', 'Birthdate not provided', 400, 'birthdate');
            missingParamError.throwErr();
        }
        const birthdateParsed = new Date(userData.birthdate);
        const aUser = user_1.User.create(userData.name, userData.email.toLowerCase(), userData.password, birthdateParsed, token);
        console.log('HERE');
        console.log(aUser);
        const hashedPassword = await this.encryptor.encrypt(userData.password);
        aUser.changePassword(hashedPassword);
        const isEmailValid = await this.emailValidator.validate(userData.email);
        if (!isEmailValid) {
            const invalidParamError = InvalidParamError_1.InvalidParamError.create('Please provide a valid email', 'User provided invalid email', 400, 'Email');
            invalidParamError.throwErr();
        }
        await this.userGateway.save(aUser);
        const output = this.presentOutput(aUser);
        return output;
    }
    presentOutput(user) {
        const output = {
            email: user.email,
            name: user.name,
            id: user.id,
            token: user.token,
            birthdate: user.birthdate
        };
        return output;
    }
}
exports.CreateUserUsecase = CreateUserUsecase;
