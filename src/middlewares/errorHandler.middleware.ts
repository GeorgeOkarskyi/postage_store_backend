import { Request, Response } from 'express';
import { ExpressError } from '../shared-entities/error.entity';
import { ResponseDTO } from '../shared-entities/responce.entity';

export const errorHandler = (err: ExpressError, req: Request, res: Response) => {
  res.status(err.status || req.statusCode || 500).json(new ResponseDTO({ error: err  } ));
};
