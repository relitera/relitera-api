import { Request, Response } from 'express';
import { CreateUserInputDto, CreateUserUsecase } from '../../../../../usecases/user/create-user/create-user.usecase';
import { HttpMethod, Route } from '../route';

export type CreateUserResponseDto = {
  name: string;
  email: string;
  id: string;
  token: string;
};

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserService: CreateUserUsecase,
  ) {}

  public static create(createUserService: CreateUserUsecase) {
    return new CreateUserRoute('/user', HttpMethod.POST, createUserService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const body = request.body;

        const input: CreateUserInputDto = body;

        const output: CreateUserResponseDto =
          await this.createUserService.execute(input);

        const responseBody = this.present(output);

        response.status(201).json(responseBody).send();
      } catch(err: any) {
        console.log(err)
        if ((err.server_message || err.client_message) && err.statusCode) {
          response.status(err.statusCode).json(err).send()
        } else {
          response.status(500).json({
            message: "An error occurred. Please try again later."
          }).send()
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

  private present(input: CreateUserResponseDto): CreateUserResponseDto {
    const response = {
      name: input.name,
      email: input.email,
      id: input.id,
      token: input.token
    };
    return response;
  }
}
