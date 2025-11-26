import { Request, Response } from 'express';
import { HttpMethod, Route } from '../route';
import { GetCoursesInputDto, GetCoursesUsecase } from '../../../../../usecases/courses/get-courses/get-courses.usecase';
import { Decimal } from '@prisma/client/runtime/library';
import { GetClassesByCourseInputDto, GetClassesByCourseUsecase } from '../../../../../usecases/courses/get-classes-by-course/get-classes-by-course.usecase';

export type GetClassesByCourseOutputDto = {
  name: string;
  description: string;
  duration_sec: number;
  video_url: string;
  done: boolean;
}[];

export class GetClassesByCourseRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getClassesByCourseService: GetClassesByCourseUsecase,
  ) {}

  public static create(getClassesByCourseService: GetClassesByCourseUsecase) {
    return new GetClassesByCourseRoute('/classes/course', HttpMethod.GET, getClassesByCourseService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const params: GetClassesByCourseInputDto = {
          course_id: request.query.course_id as string,
        };

        const output: GetClassesByCourseOutputDto =
          await this.getClassesByCourseService.execute(params);

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

  private present(input: GetClassesByCourseOutputDto): GetClassesByCourseOutputDto {
    return input;
  }
}
