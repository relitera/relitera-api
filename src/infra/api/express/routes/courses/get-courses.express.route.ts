import { Request, Response } from 'express';
import { HttpMethod, Route } from '../route';
import { GetCoursesInputDto, GetCoursesUsecase } from '../../../../../usecases/courses/get-courses/get-courses.usecase';
import { Decimal } from '@prisma/client/runtime/library';

export type GetCoursesResponseDto = {
  name: string;
  description: string;
  price: Decimal;
  id: string;
}[];

export class GetCoursesRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getCoursesService: GetCoursesUsecase,
  ) {}

  public static create(getCoursesService: GetCoursesUsecase) {
    return new GetCoursesRoute('/courses', HttpMethod.GET, getCoursesService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const output: GetCoursesResponseDto =
          await this.getCoursesService.execute();

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

  private present(input: GetCoursesResponseDto): GetCoursesResponseDto {
    return input;
  }
}
