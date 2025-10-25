import { UserGateway } from '../../../domain/user/gateway/user.gateway';
import { InvalidParamError } from '../../../errors/InvalidParamError';
import { MissingParamError } from '../../../errors/MissingParamError';
import { NoRecordsFoundError } from '../../../errors/NoRecordsFound';
import { Encryptor } from '../../../utils/encryptor/encryptor';
import { TokenI } from '../../../utils/token/token';
import { Usecase } from '../../usecase';

export type LoginInputDto = {
  email: string;
  password: string;
};

export type LoginOutputDto = {
  name: string;
  email: string;
  id: string;
  token: string;
  birthdate: Date | null;
};

export class LoginUserUsecase
  implements Usecase<LoginInputDto, LoginOutputDto>
{
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly encryptor: Encryptor,
    private readonly token: TokenI,
  ) {}

  public static create(
    userGateway: UserGateway,
    encryptor: Encryptor,
    token: TokenI,
  ) {
    return new LoginUserUsecase(
      userGateway,
      encryptor,
      token,
    );
  }

  public async execute(loginData: LoginInputDto) {
    const { email, password } = loginData;

    if (!email) {
      const missingParamError = MissingParamError.create(
        'Email not provided',
        'Please provide your email',
        400,
        'Email',
      );
      missingParamError.throwErr();
    }

    if (!password) {
      const missingParamError = MissingParamError.create(
        'Password not provided',
        'Please provide your password',
        400,
        'Password',
      );
      missingParamError.throwErr();
    }

    const userFound = await this.userGateway.findByEmail(email.toLowerCase());

    if (!userFound.email.length) {
      const noRecordsFoundError = NoRecordsFoundError.create(
        "User account not found",
        'Account not found',
        400,
        'user',
      );
      noRecordsFoundError.throwErr();
    }

    const passwordsMatch = await this.encryptor.compare(
      userFound.password,
      password,
    );

    if (!passwordsMatch) {
      const invalidParamError = InvalidParamError.create(
        'Email or password invalid.',
        "Email or password user provided is invalid",
        400,
        'Email or password',
      );
      invalidParamError.throwErr();
    }

    const token = await this.token.generate({
      email: userFound.email.toLowerCase(),
    });

    if (!token) throw new Error('Error generating token');

    await this.userGateway.updateToken(token, userFound.id)

    const output = this.presentOutput(userFound, token);

    return output;
  }

  private presentOutput(
    user: { birthdate: Date | null; email: string; password: string; name: string; id: string },
    token: string,
  ): LoginOutputDto {
    const output: LoginOutputDto = {
      email: user.email,
      name: user.name,
      id: user.id,
      token: token,
      birthdate: user.birthdate
    };

    return output;
  }
}
