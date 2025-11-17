import { CoursesGateway } from '../../../domain/user/gateway/courses.gateway';
import { MissingParamError } from '../../../errors/MissingParamError';
import { Usecase } from '../../usecase';

export type GetUserCoursesInputDto = {
    user_id: string
};

export type GetUserCoursesOutputDto = any

export class GetUserCoursesUsecase
  implements Usecase<GetUserCoursesInputDto, GetUserCoursesOutputDto>
{
  private constructor(private readonly coursesGateway: CoursesGateway) {}

  public static create(coursesGateway: CoursesGateway) {
    return new GetUserCoursesUsecase(coursesGateway);
  }

  public async execute(params: GetUserCoursesInputDto) {
    const { user_id } = params

    if (!user_id) {
        const missingParamError = MissingParamError.create(
            "Some param missing",
            "Um erro ocorreu. Tente novamente mais tarde",
            400,
            "idk"
        )
        missingParamError.throwErr()
    }
    
    const coursesFound = await this.coursesGateway.getUserCourses(user_id);

    const output = this.presentOutput(coursesFound);

    return output;
  }

  private presentOutput(
    data: any
  ): GetUserCoursesOutputDto {
    return data;
  }
}
