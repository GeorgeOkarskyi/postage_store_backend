import {
  LOG_MESSAGE_GET_PRODUCTS_END,
  LOG_MESSAGE_GET_PRODUCTS_START,
  LOG_MESSAGE_GET_PRODUCT_END,
  LOG_MESSAGE_GET_PRODUCT_START,
} from './products.constants';
import { ProductDAL } from './products.repository';
import { ProductEntity } from '../shared-entities/product.entity';
import { ServiceLevel } from '../constants';
import logger from '../utils/logger';

class ProductsService {
  private productDAL: ProductDAL;

  constructor ( productDAL: ProductDAL ) {
    this.productDAL = productDAL;
  }

  async getProducts (): Promise<ProductEntity[]> {
    logger.debug(LOG_MESSAGE_GET_PRODUCTS_START, { serviceLavel:  ServiceLevel.SERVICE });

    const productsResponse = await this.productDAL.getProducts();

    logger.info(LOG_MESSAGE_GET_PRODUCTS_END, { serviceLavel:  ServiceLevel.SERVICE });

    return productsResponse;
  }

  async getProduct (productId: string): Promise<ProductEntity> {
    logger.debug(LOG_MESSAGE_GET_PRODUCT_START, { productId, serviceLavel:  ServiceLevel.SERVICE });

    const productResponse = await this.productDAL.getProduct(productId);

    logger.debug(LOG_MESSAGE_GET_PRODUCT_END, { productId, serviceLavel:  ServiceLevel.SERVICE });

    return productResponse;
  }
}


export default new ProductsService(new ProductDAL());
