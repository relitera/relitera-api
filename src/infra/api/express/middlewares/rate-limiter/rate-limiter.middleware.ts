import { NextFunction, Request, Response } from 'express';

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    next();
  } catch (err) {
    res.status(500).json({
      message: 'An unknown error happened. Please try again later.',
      status_code: 500,
      error_msg: err,
    });
  }
};
