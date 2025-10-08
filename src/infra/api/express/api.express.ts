import { Api } from '../api';
import express, { Express } from 'express';
import { Route } from './routes/route';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

export class ApiExpress implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.addRoutes(routes);
  }

  public static create(routes: Route[]) {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();
      const middlewares = route.getMiddlewares ? route.getMiddlewares() : []

      this.app[method](path, ...middlewares, handler);
    });
  }

  public start(port: number) {
    const server = this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      this.listRoutes();
    });
  }

  private listRoutes() {
    if (this.app._router) {
      const routes = this.app._router.stack
        .filter((route: any) => route.route)
        .map((route: any) => {
          return {
            path: route.route.path,
            method: route.route.stack[0].method,
          };
        });

      console.log(routes);
    }
  }
}
