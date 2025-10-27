"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoute = void 0;
const route_1 = require("../route");
class RootRoute {
    constructor(path, method) {
        this.path = path;
        this.method = method;
        this.limit = {
            maxRequests: 10,
            perS: 30,
        };
    }
    static create() {
        return new RootRoute('/', route_1.HttpMethod.GET);
    }
    getHandler() {
        return async (request, response) => {
            try {
                const responseBody = this.present({
                    message: 'API online',
                });
                response.status(200).json(responseBody).send();
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
            message: input.message,
        };
        return response;
    }
}
exports.RootRoute = RootRoute;
