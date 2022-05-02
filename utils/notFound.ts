import {ErrorRequestHandler, NextFunction, Request, Response} from "express";

export class NotFoundError extends Error {
}

export const notFound = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                message: "Can not find element with given ID"
            });
    }
};
