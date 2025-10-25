import { Request, Response } from 'express';
import { HttpMethod, Route } from '../route';
import {
  LoginInputDto,
  LoginUserUsecase,
} from '../../../../../usecases/user/login/login.usecase';
import { MissingParamError } from '../../../../../errors/MissingParamError';

export type LoginUserResponseDto = {
  name: string;
  email: string;
  token: string;
  birthdate: Date | null;
  id: string;
};

export class LoginUserRoute implements Route {
  private limit: { maxRequests: number, perS: number } = {
    maxRequests: 10,
    perS: 30
  };

  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly loginUserService: LoginUserUsecase,
  ) {}

  public static create(loginUserService: LoginUserUsecase) {
    return new LoginUserRoute('/user/login', HttpMethod.POST, loginUserService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const body = request.body;

        const input: LoginInputDto = body;

        if (!input.email) {
          const missingParamError = MissingParamError.create(
            'Email not provided',
            undefined,
            400,
            'email',
          );
          missingParamError.throwErr();
        }


        const output: LoginUserResponseDto =
          await this.loginUserService.execute(input);

        const responseBody = this.present(output);

        response.status(201).json(responseBody).send();
      } catch (err: any) {
        console.log(err);
        if ((err.server_message || err.client_message) && err.statusCode) {
          response.status(err.statusCode).json(err).send();
        } else {
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

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: LoginUserResponseDto): LoginUserResponseDto {
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
