import {
  LOG_MESSAGE_CHECKOUT_USER_CART_REQUEST_END,
  LOG_MESSAGE_CHECKOUT_USER_CART_REQUEST_ERROR,
  LOG_MESSAGE_CHECKOUT_USER_CART_REQUEST_START,
  LOG_MESSAGE_EMPTY_USER_CART_REQUEST_END,
  LOG_MESSAGE_EMPTY_USER_CART_REQUEST_ERROR,
  LOG_MESSAGE_EMPTY_USER_CART_REQUEST_START,
  LOG_MESSAGE_REQUEST_USER_CART_END,
  LOG_MESSAGE_REQUEST_USER_CART_ERROR,
  LOG_MESSAGE_REQUEST_USER_CART_START,
  LOG_MESSAGE_UPDATE_REQUEST_USER_CART_END,
  LOG_MESSAGE_UPDATE_REQUEST_USER_CART_ERROR,
  LOG_MESSAGE_UPDATE_REQUEST_USER_CART_START,
} from './cart.constants';
import { NextFunction, Response } from 'express';
import { ApiRequest } from '../middlewares/authenticate.middleware';
import CartService from './cart.service';
import { ResponseDTO } from '../shared-entities/responce.entity';
import { ServiceLevel } from '../constants';
import logger from '../utils/logger';


class CartController {
  public async requestUserCart ({ user }: ApiRequest, res: Response, next: NextFunction) {
    try {
      logger.debug(LOG_MESSAGE_REQUEST_USER_CART_START, { user, serviceLavel:  ServiceLevel.CONTROLLER });

      const userId = user?.id as string;
      const userCart = await CartService.getUserCart(userId);

      logger.info(LOG_MESSAGE_REQUEST_USER_CART_END, { user, serviceLavel:  ServiceLevel.CONTROLLER });

      res.send(new ResponseDTO({ data: userCart }));
    } catch (error) {
      logger.error(LOG_MESSAGE_REQUEST_USER_CART_ERROR, { error, serviceLavel:  ServiceLevel.CONTROLLER });

      return next(error);
    }
  }

  public async updateUserCart ({ body, user }: ApiRequest, res: Response, next: NextFunction) {
    try {
      logger.debug(LOG_MESSAGE_UPDATE_REQUEST_USER_CART_START, { body, user, serviceLavel:  ServiceLevel.CONTROLLER });

      const userId = user?.id as string;
      const updateUserCartResponce = await CartService.updateUserCart(userId, body);

      logger.info(LOG_MESSAGE_UPDATE_REQUEST_USER_CART_END, { body, user, serviceLavel:  ServiceLevel.CONTROLLER });

      res.send(new ResponseDTO({ data: updateUserCartResponce }));
    } catch (error) {
      logger.error(LOG_MESSAGE_UPDATE_REQUEST_USER_CART_ERROR, { error, serviceLavel:  ServiceLevel.CONTROLLER });

      return next(error);
    }
  }

  public async emptyUserCart ({ user }: ApiRequest, res: Response, next: NextFunction) {
    try {
      logger.debug(LOG_MESSAGE_EMPTY_USER_CART_REQUEST_START, { user, serviceLavel:  ServiceLevel.CONTROLLER });

      const userId = user?.id as string;

      const emptyUserCartResponce = await CartService.emptyUserCart(userId);

      logger.info(LOG_MESSAGE_EMPTY_USER_CART_REQUEST_END, { user, serviceLavel:  ServiceLevel.CONTROLLER });

      res.send(new ResponseDTO({ data: emptyUserCartResponce }));
    } catch (error) {
      logger.error(LOG_MESSAGE_EMPTY_USER_CART_REQUEST_ERROR, { error, serviceLavel:  ServiceLevel.CONTROLLER });

      return next(error);
    }
  }

  public async chackoutUserCart ({ user, body }: ApiRequest, res: Response, next: NextFunction) {
    try {
      logger.debug(LOG_MESSAGE_CHECKOUT_USER_CART_REQUEST_START,
        { user, body, serviceLavel:  ServiceLevel.CONTROLLER });

      const userId = user?.id as string;

      const chackoutUserCartResponse = await CartService.chackoutUserCart(userId, body);

      logger.info(LOG_MESSAGE_CHECKOUT_USER_CART_REQUEST_END, { user, body, serviceLavel:  ServiceLevel.CONTROLLER });

      res.send(new ResponseDTO({ data: chackoutUserCartResponse }));
    } catch (error) {
      logger.error(LOG_MESSAGE_CHECKOUT_USER_CART_REQUEST_ERROR, { error, serviceLavel:  ServiceLevel.CONTROLLER });

      return next(error);
    }
  }
}

export default new CartController();
