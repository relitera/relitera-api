import { NextFunction, Request, Response } from "express";

export type HttpMethod = "get" | "post";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    DELETE: "delete" as HttpMethod,
    PATCH: "patch" as HttpMethod
} as const;

export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<void>;
    getPath(): string;
    getMethod(): HttpMethod;
    getMiddlewares?: () => Array<(req: Request, res: Response, next: NextFunction) => void | Promise<void>>
}