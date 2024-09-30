import {
  LOG_MESSAGE_CHECKOUT_USER_CART_END,
  LOG_MESSAGE_CHECKOUT_USER_CART_START,
  LOG_MESSAGE_EMPTY_USER_CART_END,
  LOG_MESSAGE_EMPTY_USER_CART_START,
  LOG_MESSAGE_GET_USER_CART_END,
  LOG_MESSAGE_GET_USER_CART_START,
  LOG_MESSAGE_UPDATE_USER_CART_END,
  LOG_MESSAGE_UPDATE_USER_CART_START,
} from './cart.constants';
import { ORDER_STATUS, OrderEntity } from '../shared-entities/order.entity';
import { CartDAL } from './cart.repository';
import { CartEntity } from '../shared-entities/cart.entity';
import { CartItemEntity } from '../shared-entities/cart-item.entity';
import { DeleteResponce } from '../shared-entities/responce.entity';
import { Delivery } from '../shared-entities/delivery.entity';
import { Payment } from '../shared-entities/payment.entity';
import { ServiceLevel } from '../constants';
import logger from '../utils/logger';

class CartService {
  private cartDAL: CartDAL;

  constructor ( cartDAL: CartDAL ) {
    this.cartDAL = cartDAL;
  }

  async getUserCart (userId: string): Promise<CartEntity> {
    logger.debug(LOG_MESSAGE_GET_USER_CART_START, { userId, serviceLavel:  ServiceLevel.SERVICE });

    let userCart = await this.cartDAL.requestUserCart(userId);

    if (!userCart) {
      userCart = await this.cartDAL.createUserCart(userId);
    }

    logger.info(LOG_MESSAGE_GET_USER_CART_END, { userId, serviceLavel:  ServiceLevel.SERVICE });

    return new CartEntity({ ...userCart, items: userCart.items?.getItems()
      .map(item => new CartItemEntity({ ...item, cartId: userCart.id })) });
  }

  async updateUserCart (userId: string, product: { productId: string, count: number }): Promise<CartEntity> {
    logger.debug(LOG_MESSAGE_UPDATE_USER_CART_START, { userId, product, serviceLavel:  ServiceLevel.SERVICE });

    const updatedUserCart = await this.cartDAL.updateUserCart(userId, product);

    logger.info(LOG_MESSAGE_UPDATE_USER_CART_END, { userId, product, serviceLavel:  ServiceLevel.SERVICE });

    return new CartEntity({ ...updatedUserCart, items: updatedUserCart.items?.getItems()
      .map(item => new CartItemEntity({ ...item, cartId: updatedUserCart.id })) });
  }

  async emptyUserCart (userId: string): Promise<DeleteResponce> {
    logger.debug(LOG_MESSAGE_EMPTY_USER_CART_START, { userId, serviceLavel:  ServiceLevel.SERVICE });

    const updateUserCartResponce = await this.cartDAL.emptyUserCart(userId);

    logger.info(LOG_MESSAGE_EMPTY_USER_CART_END, { userId, serviceLavel:  ServiceLevel.SERVICE });

    return updateUserCartResponce;
  }

  async chackoutUserCart (userId: string,
    { payment, delivery, comments, status }:
    { payment: Payment; delivery: Delivery; comments: string; status: ORDER_STATUS },
  ): Promise<OrderEntity> {
    logger.debug(LOG_MESSAGE_CHECKOUT_USER_CART_START, { userId, serviceLavel:  ServiceLevel.SERVICE });

    const userOrder = await this.cartDAL.createOrder(userId, payment, delivery, comments, status);

    if (userOrder) {
      await this.cartDAL.emptyUserCart(userId);
    }

    logger.info(LOG_MESSAGE_CHECKOUT_USER_CART_END, { userId, serviceLavel:  ServiceLevel.SERVICE });

    return new OrderEntity({ ...userOrder,
      items: userOrder.items.map(item => new CartItemEntity({ ...item, cartId: userOrder.cartId })) });
  }
}

const cartDAL = new CartDAL();

export default new CartService(cartDAL);
