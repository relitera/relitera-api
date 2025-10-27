import { PrismaClient } from '@prisma/client';
import { UserGateway } from '../../../domain/user/gateway/user.gateway';
import { User } from '../../../domain/user/entity/user';

export class UserRepositoryPrisma implements UserGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new UserRepositoryPrisma(prismaClient);
  }

  public async save(user: User): Promise<void> {
    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      birthdate: user.birthdate,
      token: user.token
    };

    await this.prismaClient.users.create({
      data,
    });
  }

  public async findByEmail(
    email: string,
  ): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    birthdate: Date | null;
    token: string;
  }> {
    const user = await this.prismaClient.users.findUnique({
      where: { email: email },
    });
    console.log(email);
    console.log(user);

    return {
      id: user && user.id ? user.id : '',
      email: user && user.email ? user.email : '',
      name: user && user.name ? user.name : '',
      password: user && user.password ? user.password : '',
      birthdate: user ? user.birthdate : null,
      token: user && user.token ? user.token : ''
    };
  }

  public async findById(
    id: string,
  ): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    birthdate: Date | null;
    token: string;
  }> {
    const user = await this.prismaClient.users.findUnique({
      where: { id: id },
    });

    return {
      id: user && user.id ? user.id : '',
      email: user && user.email ? user.email : '',
      name: user && user.name ? user.name : '',
      password: user && user.password ? user.password : '',
      birthdate: user ? user.birthdate : null,
      token: user && user.token ? user.token : ''
    };
  }

  public async deleteByEmail(
    email: string,
  ): Promise<{ email: string; id: string } | null> {
    const user = await this.prismaClient.users.delete({
      where: { email: email },
    });

    if (!user.email) return null;

    return {
      email: user.email,
      id: user.id,
    };
  }

  public async updateToken(newToken: string, userId: string): Promise<void> {
    await this.prismaClient.users.update({
      where: { id: userId },
      data: {
        token: newToken
      }
    })
  }
}
