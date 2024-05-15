import { Request,Response, NextFunction } from 'express';
import { ServerResponseCodes, TOKEN_NOT_PROVIDED_MESSAGE, FORBIDEN_MESSAGE, USER_ID_HEADER_KEY, USER_ID_ADMIN_VALUE } from '../constants';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[USER_ID_HEADER_KEY];
    if(!userId){
        res.status(ServerResponseCodes.NotFound).send(TOKEN_NOT_PROVIDED_MESSAGE)
    }

    if(userId === USER_ID_ADMIN_VALUE) {
        next();
    }else {
        res.status(ServerResponseCodes.Forbidden).send(FORBIDEN_MESSAGE);
    }
}