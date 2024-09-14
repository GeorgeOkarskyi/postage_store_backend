import { Request, Response, NextFunction } from 'express';
import { DI } from '../server';
import { DB_CONNECTION_FAILED_MESSAGE, HEALTH_CHECK_FAILED_MESSAGE } from '../constants';

export const healthcheckup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await DI.em.getConnection().execute('SELECT 1');
        res.status(200).send('OK');
    } catch (error) {
        console.error(HEALTH_CHECK_FAILED_MESSAGE, error);
        res.status(500).send(DB_CONNECTION_FAILED_MESSAGE);
    }
}