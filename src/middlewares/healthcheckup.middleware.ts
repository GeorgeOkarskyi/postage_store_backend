import { DB_CONNECTION_FAILED_MESSAGE, HEALTH_CHECK_FAILED_MESSAGE } from '../constants';
import { Request, Response } from 'express';
import { DI } from '../server';

export const healthcheckup = async (req: Request, res: Response) => {
  try {
    await DI.em.getConnection().execute('SELECT 1');
    res.status(200).send('OK');
  } catch (error) {
    console.error(HEALTH_CHECK_FAILED_MESSAGE, error);
    res.status(500).send(DB_CONNECTION_FAILED_MESSAGE);
  }
};
