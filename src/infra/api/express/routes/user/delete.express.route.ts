import { Request, Response } from 'express';
import { HttpMethod, Route } from '../route';
import { DeleteUserInputDto, DeleteUserUsecase } from '../../../../../usecases/user/delete/delete.usecase';
import { userAccessMiddleware } from '../../middlewares/user-access-routes/user-access-routes.middleware';

export type DeleteUserResponseDto = {
  deleted_at: Date;
    email: string;
    id: string;
};

export class DeleteUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteUserService: DeleteUserUsecase,
  ) {}

  public static delete(deleteUserService: DeleteUserUsecase) {
    return new DeleteUserRoute('/user/:email', HttpMethod.DELETE, deleteUserService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const body = request.params;

        const input: DeleteUserInputDto = body as DeleteUserInputDto;

        const output: DeleteUserResponseDto =
          await this.deleteUserService.execute(input);

        const responseBody = this.present(output);

        response.status(200).json(responseBody).send();
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

  private present(input: DeleteUserResponseDto): DeleteUserResponseDto {
    const response = {
      email: input.email,
      id: input.id,
      deleted_at: input.deleted_at
    };
    return response;
  }
}
