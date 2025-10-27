"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRoute = void 0;
const route_1 = require("../route");
class CreateUserRoute {
    constructor(path, method, createUserService) {
        this.path = path;
        this.method = method;
        this.createUserService = createUserService;
    }
    static create(createUserService) {
        return new CreateUserRoute('/user', route_1.HttpMethod.POST, createUserService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                console.log(request.body);
                const body = request.body;
                const input = body;
                const output = await this.createUserService.execute(input);
                const responseBody = this.present(output);
                response.status(201).json(responseBody).send();
            }
            catch (err) {
                console.log(err);
                if ((err.server_message || err.client_message) && err.statusCode) {
                    response.status(err.statusCode).json(err).send();
                }
                else {
                    response.status(500).json({
                        message: "An error occurred. Please try again later."
                    }).send();
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
            id: input.id,
            token: input.token,
            birthdate: input.birthdate
        };
        return response;
    }
}
exports.CreateUserRoute = CreateUserRoute;
