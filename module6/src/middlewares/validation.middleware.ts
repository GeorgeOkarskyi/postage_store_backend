import { Request, Response, NextFunction } from 'express';
import { ExpressError } from '../models/error.entity';
import { ServerResponseCodes } from '../constants';
import { validateBody } from '../joi/joi';

export const validatRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateBody(req);

    if(error) {
        return next(new ExpressError({ message: error.message, status: ServerResponseCodes.BadRequest}));
    }

    next();
}