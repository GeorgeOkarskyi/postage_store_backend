import {
  LOG_MESSAGE_GET_PRODUCTS_END,
  LOG_MESSAGE_GET_PRODUCTS_ERROR,
  LOG_MESSAGE_GET_PRODUCTS_START,
  LOG_MESSAGE_GET_PRODUCT_END,
  LOG_MESSAGE_GET_PRODUCT_ERROR,
  LOG_MESSAGE_GET_PRODUCT_START,
} from './products.constants';
import { NextFunction, Request, Response } from 'express';
import ProductsService from './products.service';
import { ResponseDTO } from '../shared-entities/responce.entity';
import { ServiceLevel } from '../constants';
import logger from '../utils/logger';

class ProductsController {
  async requestProducts (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.debug(LOG_MESSAGE_GET_PRODUCTS_START, { serviceLavel:  ServiceLevel.CONTROLLER });

      const productsResponce = await ProductsService.getProducts();

      logger.info(LOG_MESSAGE_GET_PRODUCTS_END, { serviceLavel:  ServiceLevel.CONTROLLER });

      res.send(new ResponseDTO({ data: productsResponce }));
    } catch (error) {
      logger.error(LOG_MESSAGE_GET_PRODUCTS_ERROR, { serviceLavel:  ServiceLevel.CONTROLLER });

      return next(error);
    }
  }

  async requestProduct ({ params: { productId } }: Request, res: Response, next: NextFunction) {
    try {
      logger.debug(LOG_MESSAGE_GET_PRODUCT_START, { productId, serviceLavel:  ServiceLevel.CONTROLLER });

      const productResponce = await ProductsService.getProduct(productId);

      logger.info(LOG_MESSAGE_GET_PRODUCT_END, { productId, serviceLavel:  ServiceLevel.CONTROLLER });

      res.send(new ResponseDTO({ data: productResponce }));
    } catch (error) {
      logger.error(LOG_MESSAGE_GET_PRODUCT_ERROR, { productId, serviceLavel:  ServiceLevel.CONTROLLER });

      return next(error);
    }
  }
}

export default new ProductsController();
