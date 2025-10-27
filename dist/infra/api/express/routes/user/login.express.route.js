"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserRoute = void 0;
const route_1 = require("../route");
const MissingParamError_1 = require("../../../../../errors/MissingParamError");
class LoginUserRoute {
    constructor(path, method, loginUserService) {
        this.path = path;
        this.method = method;
        this.loginUserService = loginUserService;
        this.limit = {
            maxRequests: 10,
            perS: 30
        };
    }
    static create(loginUserService) {
        return new LoginUserRoute('/user/login', route_1.HttpMethod.POST, loginUserService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                const body = request.body;
                const input = body;
                if (!input.email) {
                    const missingParamError = MissingParamError_1.MissingParamError.create('Email not provided', undefined, 400, 'email');
                    missingParamError.throwErr();
                }
                const output = await this.loginUserService.execute(input);
                const responseBody = this.present(output);
                response.status(201).json(responseBody).send();
            }
            catch (err) {
                console.log(err);
                if ((err.server_message || err.client_message) && err.statusCode) {
                    response.status(err.statusCode).json(err).send();
                }
                else {
                    response
                        .status(500)
                        .json({
                        message: 'An error occurred. Please try again later.',
                    })
                        .send();
                }
            }
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    present(input) {
        const response = {
            name: input.name,
            email: input.email,
            token: input.token,
            id: input.id,
            birthdate: input.birthdate
        };
        return response;
    }
}
exports.LoginUserRoute = LoginUserRoute;
