import { User } from '../../../domain/user/entity/user';
import { UserGateway } from '../../../domain/user/gateway/user.gateway';
import { InvalidParamError } from '../../../errors/InvalidParamError';
import { MissingParamError } from '../../../errors/MissingParamError';
import { EmailValidatorI } from '../../../utils/EmailValidator/emailValidator';
import { Encryptor } from '../../../utils/encryptor/encryptor';
import { TokenI } from '../../../utils/token/token';
import { Usecase } from '../../usecase';

export type CreateUserInputDto = {
  name: string;
  email: string;
  password: string;
  birthdate: string;
};

export type CreateUserOutputDto = {
  name: string;
  email: string;
  id: string;
  token: string;
  birthdate: Date;
};

export class CreateUserUsecase
  implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly emailValidator: EmailValidatorI,
    private readonly encryptor: Encryptor,
    private readonly token: TokenI,
  ) {}

  public static create(
    userGateway: UserGateway,
    emailValidator: EmailValidatorI,
    encryptor: Encryptor,
    token: TokenI,
  ) {
    return new CreateUserUsecase(
      userGateway,
      emailValidator,
      encryptor,
      token,
    );
  }

  public async execute(
    userData: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    const token = await this.token.generate({
      email: userData.email,
    });

    if (!token) throw new Error('Error generating token');

    if (!userData.email) {
      const missingParamError = MissingParamError.create(
        'Email not provided',
        'Please provide your email',
        400,
        'Email',
      );
      missingParamError.throwErr();
    }

    const userFound = await this.userGateway.findByEmail(userData.email.toLowerCase());

    if (userFound.id && userFound.id.length) {
      const invalidParamError = InvalidParamError.create(
        'Account already exists',
        'User provided an email thats already linked to an account',
        400,
        'Email',
      );
      invalidParamError.throwErr();
    }

    const birthdateParsed = new Date(userData.birthdate)

    const aUser = User.create(
      userData.name,
      userData.email.toLowerCase(),
      userData.password,
      birthdateParsed,
      token,
    );

    console.log('HERE');
    console.log(aUser);

    const hashedPassword = await this.encryptor.encrypt(userData.password);

    aUser.changePassword(hashedPassword);

    const isEmailValid = await this.emailValidator.validate(userData.email);

    if (!isEmailValid) {
      const invalidParamError = InvalidParamError.create(
        'Please provide a valid email',
        'User provided invalid email',
        400,
        'Email',
      );
      invalidParamError.throwErr();
    }

    await this.userGateway.save(aUser);

    const output = this.presentOutput(aUser);

    return output;
  }

  private presentOutput(user: User): CreateUserOutputDto {
    const output: CreateUserOutputDto = {
      email: user.email,
      name: user.name,
      id: user.id,
      token: user.token,
      birthdate: user.birthdate
    };

    return output;
  }
}
