"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCoursesRoute = void 0;
const route_1 = require("../route");
class GetCoursesRoute {
    constructor(path, method, getCoursesService) {
        this.path = path;
        this.method = method;
        this.getCoursesService = getCoursesService;
    }
    static create(getCoursesService) {
        return new GetCoursesRoute('/courses', route_1.HttpMethod.GET, getCoursesService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                const output = await this.getCoursesService.execute();
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
        return input;
    }
}
exports.GetCoursesRoute = GetCoursesRoute;
