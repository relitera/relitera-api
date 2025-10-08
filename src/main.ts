import config from './config/config';
import { prisma } from './config/db/prisma/prisma';
import { ApiExpress } from './infra/api/express/api.express';
import { RootRoute } from './infra/api/express/routes/root/root.express.route';
import { CreateUserRoute } from './infra/api/express/routes/user/create-user.express.route';
import { DeleteUserRoute } from './infra/api/express/routes/user/delete.express.route';
import { LoginUserRoute } from './infra/api/express/routes/user/login.express.route';

import { UserRepositoryPrisma } from './infra/repositories/user/user.repository.prisma';
import { CreateUserUsecase } from './usecases/user/create-user/create-user.usecase';
import { DeleteUserUsecase } from './usecases/user/delete/delete.usecase';
import { LoginUserUsecase } from './usecases/user/login/login.usecase';
import { EmailValidator } from './utils/EmailValidator/EmailValidator.email_validator';
import { EncryptorBcrypt } from './utils/encryptor/Encryptor.bcrypt';
import { TokenJWT } from './utils/token/token.jwt';

function main() {
  const rootRoute = RootRoute.create()

  const aRepository = UserRepositoryPrisma.create(prisma);
  const encryptorBcrypt = EncryptorBcrypt.create();
  const emailValidator = EmailValidator.create();
  const jwtToken = TokenJWT.create();

  const createUserUsecase = CreateUserUsecase.create(
    aRepository,
    emailValidator,
    encryptorBcrypt,
    jwtToken,
  );
  const createRoute = CreateUserRoute.create(createUserUsecase);

  const deleteUserUsecase = DeleteUserUsecase.create(aRepository);
  const deleteRoute = DeleteUserRoute.delete(deleteUserUsecase);

  const loginUserUsecase = LoginUserUsecase.create(
    aRepository,
    encryptorBcrypt,
    jwtToken,
  );
  const loginRoute = LoginUserRoute.create(loginUserUsecase);

  const api = ApiExpress.create([
    rootRoute,
    createRoute,
    deleteRoute,
    loginRoute,
  ]);

  const port = config.port

  api.start(port);
}

main();
