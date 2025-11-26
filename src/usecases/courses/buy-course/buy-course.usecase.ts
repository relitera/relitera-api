import { CoursesGateway } from '../../../domain/user/gateway/courses.gateway';
import { MissingParamError } from '../../../errors/MissingParamError';
import { Usecase } from '../../usecase';

export type BuyCourseInputDto = {
    course_ids: string[];
    user_id: string;
};

export type BuyCourseOutputDto = {
  message: string;
  success: boolean
};

export class BuyCourseUsecase
  implements Usecase<BuyCourseInputDto, BuyCourseOutputDto>
{
  private constructor(private readonly coursesGateway: CoursesGateway) {}

  public static create(coursesGateway: CoursesGateway) {
    return new BuyCourseUsecase(coursesGateway);
  }

  public async execute(body: BuyCourseInputDto) {
    const { user_id, course_ids } = body

    if (!user_id || !course_ids) {
        const missingParamError = MissingParamError.create(
            "Some param missing",
            "Um erro ocorreu. Tente novamente mais tarde",
            400,
            "idk"
        )
        missingParamError.throwErr()
    }

    const courseCreated = await this.coursesGateway.buyCourse(user_id, course_ids);

    if (!courseCreated) {
        const missingParamError = MissingParamError.create(
            "Some param missing",
            "Um erro ocorreu. Tente novamente mais tarde",
            400,
            "idk"
        )
        missingParamError.throwErr()
    }

    const output = this.presentOutput({
        message: "Curso comprado com sucesso",
        success: true
    });

    return output;
  }

  private presentOutput(
    data: BuyCourseOutputDto,
  ): BuyCourseOutputDto {
    return data;
  }
}
