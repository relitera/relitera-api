"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const prisma_1 = require("./config/db/prisma/prisma");
const api_express_1 = require("./infra/api/express/api.express");
const get_courses_express_route_1 = require("./infra/api/express/routes/courses/get-courses.express.route");
const root_express_route_1 = require("./infra/api/express/routes/root/root.express.route");
const create_user_express_route_1 = require("./infra/api/express/routes/user/create-user.express.route");
const delete_express_route_1 = require("./infra/api/express/routes/user/delete.express.route");
const login_express_route_1 = require("./infra/api/express/routes/user/login.express.route");
const courses_repository_prisma_1 = require("./infra/repositories/courses/courses.repository.prisma");
const user_repository_prisma_1 = require("./infra/repositories/user/user.repository.prisma");
const get_courses_usecase_1 = require("./usecases/courses/get-courses/get-courses.usecase");
const create_user_usecase_1 = require("./usecases/user/create-user/create-user.usecase");
const delete_usecase_1 = require("./usecases/user/delete/delete.usecase");
const login_usecase_1 = require("./usecases/user/login/login.usecase");
const EmailValidator_email_validator_1 = require("./utils/EmailValidator/EmailValidator.email_validator");
const Encryptor_bcrypt_1 = require("./utils/encryptor/Encryptor.bcrypt");
const token_jwt_1 = require("./utils/token/token.jwt");
function main() {
    const rootRoute = root_express_route_1.RootRoute.create();
    const aRepository = user_repository_prisma_1.UserRepositoryPrisma.create(prisma_1.prisma);
    const encryptorBcrypt = Encryptor_bcrypt_1.EncryptorBcrypt.create();
    const emailValidator = EmailValidator_email_validator_1.EmailValidator.create();
    const jwtToken = token_jwt_1.TokenJWT.create();
    const createUserUsecase = create_user_usecase_1.CreateUserUsecase.create(aRepository, emailValidator, encryptorBcrypt, jwtToken);
    const createRoute = create_user_express_route_1.CreateUserRoute.create(createUserUsecase);
    const deleteUserUsecase = delete_usecase_1.DeleteUserUsecase.create(aRepository);
    const deleteRoute = delete_express_route_1.DeleteUserRoute.delete(deleteUserUsecase);
    const loginUserUsecase = login_usecase_1.LoginUserUsecase.create(aRepository, encryptorBcrypt, jwtToken);
    const loginRoute = login_express_route_1.LoginUserRoute.create(loginUserUsecase);
    const coursesRepository = courses_repository_prisma_1.CoursesRepositoryPrisma.create(prisma_1.prisma);
    const getAllCoursesUsecase = get_courses_usecase_1.GetCoursesUsecase.create(coursesRepository);
    const getAllCoursesRoute = get_courses_express_route_1.GetCoursesRoute.create(getAllCoursesUsecase);
    const api = api_express_1.ApiExpress.create([
        rootRoute,
        createRoute,
        deleteRoute,
        loginRoute,
        getAllCoursesRoute
    ]);
    const port = config_1.default.port;
    api.start(port);
}
main();
