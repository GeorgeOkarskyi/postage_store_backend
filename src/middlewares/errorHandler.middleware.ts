import { Request, Response, NextFunction } from 'express';
import { ExpressError } from '../models/error.entity';
import { ResponseDTO } from '../models/responce.entity'

export const errorHandler = (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || req.statusCode || 500).json(new ResponseDTO({ error: err }));
}