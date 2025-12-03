import { CoursesGateway } from '../../../domain/user/gateway/courses.gateway';
import { MissingParamError } from '../../../errors/MissingParamError';
import { Usecase } from '../../usecase';

export type GetClassesByCourseInputDto = {
    course_id: string
};

export type GetClassesByCourseOutputDto = {
  name: string;
  description: string;
  duration_sec: number;
  video_url: string;
  done: boolean;
}[];

export class GetClassesByCourseUsecase
  implements Usecase<GetClassesByCourseInputDto, GetClassesByCourseOutputDto>
{
  private constructor(private readonly coursesGateway: CoursesGateway) {}

  public static create(coursesGateway: CoursesGateway) {
    return new GetClassesByCourseUsecase(coursesGateway);
  }

  public async execute(params: GetClassesByCourseInputDto) {
    const { course_id } = params

    if (!course_id) {
        const missingParamError = MissingParamError.create(
            "Course id is missing",
            "Um erro ocorreu. Tente novamente mais tarde",
            400,
            "course_id"
        )
        missingParamError.throwErr()
    }
    
    const coursesFound = await this.coursesGateway.getClassesByCourse(course_id);


    const output = this.presentOutput(coursesFound);

    return output;
  }

  private presentOutput(
    data: any
  ): GetClassesByCourseOutputDto {
    return data;
  }
}
