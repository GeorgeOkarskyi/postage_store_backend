import {
  LOG_MESSAGE_REQUEST_PRODUCTS_END,
  LOG_MESSAGE_REQUEST_PRODUCTS_START,
  LOG_MESSAGE_REQUEST_PRODUCT_END,
  LOG_MESSAGE_REQUEST_PRODUCT_ERROR,
  LOG_MESSAGE_REQUEST_PRODUCT_START,
} from './products.constants';
import { NO_PRODUCT_FOUND_MESSAGE, ServerResponseCodes, ServiceLevel } from '../constants';
import { DI } from '../server';
import { ExpressError } from '../shared-entities/error.entity';
import { ProductEntity } from '../shared-entities/product.entity';
import logger from '../utils/logger';

export class ProductDAL {
  async getProducts (): Promise<ProductEntity[]> {
    logger.debug(LOG_MESSAGE_REQUEST_PRODUCTS_START, { serviceLavel:  ServiceLevel.REPOSITORY });

    const productsResponce = (await DI.product.findAll())
      .map(product => new ProductEntity({ ...product, id: product.id as string }));

    logger.info(LOG_MESSAGE_REQUEST_PRODUCTS_END, { serviceLavel:  ServiceLevel.REPOSITORY });

    return productsResponce;
  }

  async getProduct (productId: string): Promise<ProductEntity> {
    logger.debug(LOG_MESSAGE_REQUEST_PRODUCT_START, { productId, serviceLavel:  ServiceLevel.REPOSITORY });

    const productResponce = await DI.product.findOneOrFail({ id: productId }, { failHandler: () => {
      logger.error(LOG_MESSAGE_REQUEST_PRODUCT_ERROR, { productId, serviceLavel:  ServiceLevel.REPOSITORY });

      throw new ExpressError({ message: NO_PRODUCT_FOUND_MESSAGE, status: ServerResponseCodes.NotFound });
    } });

    logger.info(LOG_MESSAGE_REQUEST_PRODUCT_END, { productId, serviceLavel:  ServiceLevel.REPOSITORY });

    return new ProductEntity({ ...productResponce, id: productResponce.id as string });
  }
}
