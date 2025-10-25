import { PrismaClient } from '@prisma/client';
import { CoursesGateway } from '../../../domain/user/gateway/courses.gateway';
import { Decimal } from '@prisma/client/runtime/library';

export class CoursesRepositoryPrisma implements CoursesGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new CoursesRepositoryPrisma(prismaClient);
  }

  public async getAll(): Promise<{
    id: string;
    name: string;
    description: string;
    price: Decimal;
  }[]> {
  
    const courses = await this.prismaClient.courses.findMany()

    return courses
  }
}
