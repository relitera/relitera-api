"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAccessMiddleware = void 0;
const token_jwt_1 = require("../../../../../utils/token/token.jwt");
const InvalidTokenError_1 = require("../../../../../errors/InvalidTokenError");
const userAccessMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({
                message: "You are not authorized to proceed with this action"
            });
            return;
        }
        const tokenEntity = token_jwt_1.TokenJWT.create();
        const decodedToken = await tokenEntity.decode(token);
        if (!decodedToken) {
            const invalidTokenError = InvalidTokenError_1.InvalidTokenError.create();
            invalidTokenError.throwErr();
            return;
        }
        next();
    }
    catch (err) {
        res.status(500).json({
            message: "An unknown error happened. Please try again later.",
            status_code: 500,
            error_msg: err
        });
    }
};
exports.userAccessMiddleware = userAccessMiddleware;
