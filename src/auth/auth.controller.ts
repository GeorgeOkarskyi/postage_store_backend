import {
  LOG_MESSAGE_LOGIN_END,
  LOG_MESSAGE_LOGIN_ERROR,
  LOG_MESSAGE_LOGIN_START,
  LOG_MESSAGE_REGISTER_END,
  LOG_MESSAGE_REGISTER_ERROR,
  LOG_MESSAGE_REGISTER_START,
} from './auth.constants';
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { ResponseDTO } from '../shared-entities/responce.entity';
import { ServiceLevel } from '../constants';
import logger from '../utils/logger';


class AuthController {
  public async registerUser (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;

      logger.debug(LOG_MESSAGE_REGISTER_START, { email, role, serviceLavel:  ServiceLevel.CONTROLLER });

      const registerResponce = await AuthService.register(email, password, role);

      logger.info(LOG_MESSAGE_REGISTER_END, { email, role, serviceLavel:  ServiceLevel.CONTROLLER });

      res.send(new ResponseDTO({ data: registerResponce }));
    } catch (error) {
      if (error instanceof Error) {
        logger.error(LOG_MESSAGE_REGISTER_ERROR,
          { error: error.message, stack: error.stack, serviceLavel:  ServiceLevel.CONTROLLER });
      }

      return next(error);
    }
  }

  public async loginUser (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      logger.debug(LOG_MESSAGE_LOGIN_START, { email, serviceLavel:  ServiceLevel.CONTROLLER });

      const loginResponce = await AuthService.login(email, password);

      logger.info(LOG_MESSAGE_LOGIN_END, { email, serviceLavel:  ServiceLevel.CONTROLLER });

      res.send(new ResponseDTO({ data: loginResponce }));
    } catch (error) {
      if (error instanceof Error) {
        logger.error(LOG_MESSAGE_LOGIN_ERROR,
          { error: error.message, stack: error.stack, serviceLavel:  ServiceLevel.CONTROLLER });
      }

      return next(error);
    }
  }
}

export default new AuthController();
