import {ErrorRequestHandler, NextFunction, Request, Response} from "express"

export class ValidationError extends Error {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export const handleError = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  err instanceof ValidationError
      ? res.status(err.code)
      : res.status(500);

  const message = err instanceof ValidationError
      ? err.message
      : "Something went wrong. Try again later";

  res.render("error", {
    message,
  });
};

export const myValidationError = (code: number, message: string) => {
  return new ValidationError(code, message);
};

