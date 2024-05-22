import { Request } from 'express';
import { VALIDATION_MAP } from './joi.constants';

export const validateBody = (req: Request) => {
    const schemaKey = `${req.method} ${req.baseUrl}`

    return VALIDATION_MAP[schemaKey].validate(req.body);
}