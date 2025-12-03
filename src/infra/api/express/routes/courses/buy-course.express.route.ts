import { Request, Response } from 'express';
import { HttpMethod, Route } from '../route';
import { BuyCourseOutputDto, BuyCourseUsecase } from '../../../../../usecases/courses/buy-course/buy-course.usecase';

export type BuyCourseResponseDto = {
  message: string;
};

export class BuyCourseRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly buyCourseService: BuyCourseUsecase,
  ) {}

  public static create(buyCourseService: BuyCourseUsecase) {
    return new BuyCourseRoute('/course/buy', HttpMethod.POST, buyCourseService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { body } = request

        const output: BuyCourseOutputDto =
          await this.buyCourseService.execute(body);

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

  private present(input: BuyCourseResponseDto): BuyCourseResponseDto {
    return input;
  }
}
