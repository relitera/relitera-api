"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAccessMiddleware = void 0;
const adminAccessMiddleware = async (req, res, next) => {
    try {
        const rawToken = req.headers['x-admin-token'];
        const token = Array.isArray(rawToken)
            ? rawToken[0]
            : rawToken;
        if (!token) {
            res.status(401).json({
                message: 'You are not authorized to proceed with this action',
            });
            return;
        }
        if (token !== process.env.ADM_TOKEN) {
            res.status(401).json({
                message: 'You are not authorized to proceed with this action',
            });
            return;
        }
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
exports.adminAccessMiddleware = adminAccessMiddleware;
