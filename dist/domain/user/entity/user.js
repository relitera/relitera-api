"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const InvalidParamError_1 = require("../../../errors/InvalidParamError");
const MissingParamError_1 = require("../../../errors/MissingParamError");
class User {
    constructor(props) {
        this.props = props;
        this.validate();
    }
    static create(name, email, password, birthdate, token) {
        return new User({
            id: crypto.randomUUID().toString(),
            name,
            email,
            password,
            birthdate,
            token,
        });
    }
    static with(props) {
        return new User(props);
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get password() {
        return this.props.password;
    }
    get birthdate() {
        return this.props.birthdate;
    }
    get token() {
        return this.props.token;
    }
    changePassword(newPassword) {
        this.props.password = newPassword;
    }
    validatePassword(password) {
        if (!password) {
            return { success: false, message: 'Please provide a password' };
        }
        if (password.length < 8) {
            return {
                success: false,
                message: 'Password must be at least 8 characters long',
            };
        }
        if (password.length > 64) {
            return {
                success: false,
                message: 'Password must not exceed 64 characters',
            };
        }
        if (!/[A-Z]/.test(password)) {
            return {
                success: false,
                message: 'Password must contain at least one uppercase letter',
            };
        }
        if (!/[a-z]/.test(password)) {
            return {
                success: false,
                message: 'Password must contain at least one lowercase letter',
            };
        }
        if (!/[0-9]/.test(password)) {
            return {
                success: false,
                message: 'Password must contain at least one number',
            };
        }
        if (!/[!@#$%^&*(),.?":{}|<>_\-+=\\[\];'`~]/.test(password)) {
            return {
                success: false,
                message: 'Password must contain at least one special character',
            };
        }
        if (/^\s+$/.test(password)) {
            return { success: false, message: 'Password cannot be only spaces.' };
        }
        return { success: true, message: 'Password is valid.' };
    }
    validate() {
        if (!this.props.email || this.props.email.length <= 0) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Email not provided', 'Please provide your email', 400, 'Email');
            missingParamError.throwErr();
        }
        const passwordValidation = this.validatePassword(this.props.password);
        if (!passwordValidation.success) {
            const invalidParamError = InvalidParamError_1.InvalidParamError.create(passwordValidation.message, passwordValidation.message, 400, "password");
            invalidParamError.throwErr();
        }
        if (!this.props.name || this.props.name.length <= 0) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Name not provided', 'Please provide your name', 400, 'Name');
            missingParamError.throwErr();
        }
        if (!this.props.birthdate) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Birthdate not provided', undefined, 400, 'birthdate');
            missingParamError.throwErr();
        }
        if (!this.props.token || this.props.token.length <= 0) {
            const missingParamError = MissingParamError_1.MissingParamError.create('Token not provided', undefined, 400, 'token');
            missingParamError.throwErr();
        }
    }
}
exports.User = User;
