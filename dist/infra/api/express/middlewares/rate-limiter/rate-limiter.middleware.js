"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const rateLimiter = async (req, res, next) => {
    try {
        next();
    }
    catch (err) {
        res.status(500).json({
            message: 'An unknown error happened. Please try again later.',
            status_code: 500,
            error_msg: err,
        });
    }
};
exports.rateLimiter = rateLimiter;
