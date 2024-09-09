import { Request, Response, NextFunction } from 'express';
import { ServerResponseCodes, TOKEN_IS_REQUIRED_MESSAGE, USER_IS_NOT_AUTHORIZED_MESSAGE } from '../constants';
import { ExpressError } from '../models/error.entity';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../models/user.entity';

const TOKET_TYPE = 'Bearer';
export interface ApiRequest extends Request {
    user?: UserEntity;
}

export const authenticate = (req: ApiRequest, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return next(new ExpressError({ message: TOKEN_IS_REQUIRED_MESSAGE, status: ServerResponseCodes.Unauthorized}));
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== TOKET_TYPE) {
        return next(new ExpressError({ message: USER_IS_NOT_AUTHORIZED_MESSAGE, status: ServerResponseCodes.Unauthorized}));
    }

    try {
        const user = jwt.verify(token, process.env.TOKEN_KEY!) as UserEntity;

        req.user = user;
    } catch (err) {
        return next(new ExpressError({ message: USER_IS_NOT_AUTHORIZED_MESSAGE, status: ServerResponseCodes.Unauthorized}));
    }

    return next();
}