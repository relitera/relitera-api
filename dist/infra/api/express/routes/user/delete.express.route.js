"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserRoute = void 0;
const route_1 = require("../route");
const user_access_routes_middleware_1 = require("../../middlewares/user-access-routes/user-access-routes.middleware");
class DeleteUserRoute {
    constructor(path, method, deleteUserService) {
        this.path = path;
        this.method = method;
        this.deleteUserService = deleteUserService;
    }
    static delete(deleteUserService) {
        return new DeleteUserRoute('/user/:email', route_1.HttpMethod.DELETE, deleteUserService);
    }
    getMiddlewares() {
        return [user_access_routes_middleware_1.userAccessMiddleware];
    }
    getHandler() {
        return async (request, response) => {
            try {
                const body = request.params;
                const input = body;
                const output = await this.deleteUserService.execute(input);
                const responseBody = this.present(output);
                response.status(200).json(responseBody).send();
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
            email: input.email,
            id: input.id,
            deleted_at: input.deleted_at
        };
        return response;
    }
}
exports.DeleteUserRoute = DeleteUserRoute;
