import { Request, Response, NextFunction } from 'express';
import { ServerResponseCodes, USER_IS_NOT_AUTHORIZED_MESSAGE, FORBIDEN_MESSAGE, USER_ID_HEADER_KEY, USER_ID_ADMIN_VALUE } from '../constants';
import { ExpressError } from '../models/error.entity';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[USER_ID_HEADER_KEY];
    
    if(!userId){
        return next(new ExpressError({ message: USER_IS_NOT_AUTHORIZED_MESSAGE, status: ServerResponseCodes.Unauthorized}));
    }

    if(userId === USER_ID_ADMIN_VALUE) {
        next();
    }else {
        return next(new ExpressError({ message: FORBIDEN_MESSAGE, status: ServerResponseCodes.Forbidden}));
    }
}