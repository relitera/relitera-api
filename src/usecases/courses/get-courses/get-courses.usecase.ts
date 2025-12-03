import { CoursesGateway } from '../../../domain/user/gateway/courses.gateway';
import { Usecase } from '../../usecase';
import { Decimal } from '@prisma/client/runtime/library';

export type GetCoursesInputDto = null;

export type GetCoursesOutputDto = {
  name: string;
  description: string;
  price: Decimal;
  id: string;
  thumb_url: string | null;
}[];

export class GetCoursesUsecase
  implements Usecase<GetCoursesInputDto, GetCoursesOutputDto>
{
  private constructor(private readonly coursesGateway: CoursesGateway) {}

  public static create(coursesGateway: CoursesGateway) {
    return new GetCoursesUsecase(coursesGateway);
  }

  public async execute() {
    const coursesFound = await this.coursesGateway.getAll();

    const output = this.presentOutput(coursesFound);

    return output;
  }

  private presentOutput(
    data: {
      id: string;
      name: string;
      description: string;
      price: Decimal;
      thumb_url: string | null;
    }[],
  ): GetCoursesOutputDto {
    const output = data.map((each) => {
      return {
        name: each.name,
        description: each.description,
        price: each.price,
        id: each.id,
        thumb_url: each.thumb_url
      }
    })
    return output;
  }
}
