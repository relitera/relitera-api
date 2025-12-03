import { Request, Response } from 'express';
import { HttpMethod, Route } from '../route';
import {
  GetUserCoursesInputDto,
  GetUserCoursesUsecase,
} from '../../../../../usecases/courses/get-user-courses.usecase.ts/get-user-courses.usecase';

export type GetUserCoursesResponseDto = any;

export class GetUserCoursesRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getUserCoursesService: GetUserCoursesUsecase,
  ) {}

  public static create(getUserCoursesService: GetUserCoursesUsecase) {
    return new GetUserCoursesRoute(
      '/courses/user',
      HttpMethod.GET,
      getUserCoursesService,
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const params: GetUserCoursesInputDto = {
          user_id: request.query.user_id as string,
        };

        console.log(request)

        console.log(params)

        const output = await this.getUserCoursesService.execute(params);

        const validData = output.map((each: any) => each.courses)

        const responseBody = this.present(validData);
        response.status(200).json(responseBody);
      } catch (err: any) {
        console.log(err);
        if ((err.server_message || err.client_message) && err.statusCode) {
          response.status(err.statusCode).json(err);
        } else {
          response.status(500).json({
            message: 'An error occurred. Please try again later.',
          });
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

  private present(input: GetUserCoursesResponseDto): GetUserCoursesResponseDto {
    return input;
  }
}
