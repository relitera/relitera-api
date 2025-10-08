import { Request, Response } from 'express';
import { HttpMethod, Route } from '../route';
import { randomUUID } from 'crypto';

export type RootResponseDto = {
  message: string;
};

export class RootRoute implements Route {
  private limit: { maxRequests: number; perS: number } = {
    maxRequests: 10,
    perS: 30,
  };

  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
  ) {}

  public static create() {
    return new RootRoute('/', HttpMethod.GET);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const responseBody = this.present({
          message: 'API online',
        });

        response.status(200).json(responseBody).send();
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

  private present(input: RootResponseDto): RootResponseDto {
    const response = {
      message: input.message,
    };
    return response;
  }
}
