import { NextFunction, Request, Response } from "express"
import { TokenJWT } from "../../../../../utils/token/token.jwt";
import { InvalidTokenError } from "../../../../../errors/InvalidTokenError";

export const userAccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined | null = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({
                message: "You are not authorized to proceed with this action"
            })
            return
        }

        const tokenEntity = TokenJWT.create()

        const decodedToken = await tokenEntity.decode(token)

        if (!decodedToken) {
            const invalidTokenError = InvalidTokenError.create()
            invalidTokenError.throwErr()
            return
        }

        next()
    } catch(err) {
        res.status(500).json({
            message: "An unknown error happened. Please try again later.",
            status_code: 500,
            error_msg: err
        })
    }
}