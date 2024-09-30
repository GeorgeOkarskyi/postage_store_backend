import {
  LOG_MESSAGE_DB_CREATE_ORDER_REQUEST_NO_CART_ERROR,
  LOG_MESSAGE_DB_CREATE_ORDER_REQUEST_NO_PRODUCTS_ERROR,
  LOG_MESSAGE_DB_CREATE_ORDER_REQUEST_START,
  LOG_MESSAGE_DB_CREATE_USER_CART_REQUEST_END,
  LOG_MESSAGE_DB_CREATE_USER_CART_REQUEST_START,
  LOG_MESSAGE_DB_DELETE_USER_CART_REQUEST_END,
  LOG_MESSAGE_DB_DELETE_USER_CART_REQUEST_NO_CART_ERROR,
  LOG_MESSAGE_DB_DELETE_USER_CART_REQUEST_START,
  LOG_MESSAGE_DB_EMPTY_USER_CART_REQUEST_END,
  LOG_MESSAGE_DB_EMPTY_USER_CART_REQUEST_NO_CART_ERROR,
  LOG_MESSAGE_DB_EMPTY_USER_CART_REQUEST_NO_PRODUCTS_ERROR,
  LOG_MESSAGE_DB_EMPTY_USER_CART_REQUEST_START,
  LOG_MESSAGE_DB_REQUEST_USER_CART_END,
  LOG_MESSAGE_DB_REQUEST_USER_CART_START,
  LOG_MESSAGE_DB_UPDATE_USER_CART_REQUEST_END,
  LOG_MESSAGE_DB_UPDATE_USER_CART_REQUEST_NO_CART_ERROR,
  LOG_MESSAGE_DB_UPDATE_USER_CART_REQUEST_NO_PRODUCT_ERROR,
  LOG_MESSAGE_DB_UPDATE_USER_CART_REQUEST_START,
  NO_CART_FOUND_MESSAGE,
  NO_ITEMS_IN_CART_FOUND_MESSAGE,
} from './cart.constants';
import {
  NO_PRODUCT_FOUND_MESSAGE,
  ServerResponseCodes,
  ServiceLevel,
} from '../constants';
import { Cart } from '../database/models/cart.entity';
import { CartItem } from '../database/models/cartItem.entity';
import { DI } from '../server';
import { DeleteResponce } from '../shared-entities/delete-responce';
import { Delivery } from '../shared-entities/delivery.entity';
import { ExpressError } from '../shared-entities/error.entity';
import { ORDER_STATUS } from '../shared-entities/order.entity';
import { Order } from '../database/models/order.entity';
import { Payment } from '../shared-entities/payment.entity';
import { getCartTotal } from './cart.utils';
import logger from '../utils/logger';

export class CartDAL {
  async requestUserCart (userId: string): Promise<Cart | null> {
    logger.debug(LOG_MESSAGE_DB_REQUEST_USER_CART_START, { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    const userCart = DI.cart.findOne(
      { userId: userId, isDeleted: false },
      {
        populate: ['items.product'],
      },
    );

    logger.info(LOG_MESSAGE_DB_REQUEST_USER_CART_END, { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    return userCart;
  }

  async createUserCart (userId: string): Promise<Cart> {
    logger.debug(LOG_MESSAGE_DB_CREATE_USER_CART_REQUEST_START, { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    const newCart = new Cart({ userId: userId, isDeleted: false, total: 0 });

    await DI.em.persistAndFlush(newCart);

    logger.info(LOG_MESSAGE_DB_CREATE_USER_CART_REQUEST_END, { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    return newCart;
  }

  async updateUserCart (
    userId: string,
    product: { productId: string; count: number },
  ): Promise<Cart> {
    logger.debug(LOG_MESSAGE_DB_UPDATE_USER_CART_REQUEST_START,
      { userId, product, serviceLavel:  ServiceLevel.REPOSITORY });

    const cart = await this.requestUserCart(userId);

    if (!cart) {
      logger.error(LOG_MESSAGE_DB_UPDATE_USER_CART_REQUEST_NO_CART_ERROR,
        { userId, product, serviceLavel:  ServiceLevel.REPOSITORY });

      throw new ExpressError({
        message: NO_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    const productItem = await DI.product.findOne({ id: product.productId });

    if (!productItem) {
      logger.error(LOG_MESSAGE_DB_UPDATE_USER_CART_REQUEST_NO_PRODUCT_ERROR,
        { userId, product, serviceLavel:  ServiceLevel.REPOSITORY });

      throw new ExpressError({
        message: NO_PRODUCT_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    let cartItem = cart?.items.getItems().find(item => item.product.id === product.productId);

    if (cartItem) {
      cartItem.count += Number(product.count);
    } else {
      cartItem = new CartItem(product.count, cart, productItem);

      cart.items.add(cartItem);
    }

    const cartItems = cart.items?.getItems();

    cart.total = getCartTotal(cartItems);

    await DI.em.flush();

    logger.info(LOG_MESSAGE_DB_UPDATE_USER_CART_REQUEST_END,
      { userId, product, serviceLavel:  ServiceLevel.REPOSITORY });

    return cart;
  }

  async deleteUserCart (userId: string): Promise<DeleteResponce> {
    logger.debug(LOG_MESSAGE_DB_DELETE_USER_CART_REQUEST_START,
      { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    const cart = await this.requestUserCart(userId);

    if (!cart) {
      logger.error(LOG_MESSAGE_DB_DELETE_USER_CART_REQUEST_NO_CART_ERROR,
        { userId, serviceLavel:  ServiceLevel.REPOSITORY });

      throw new ExpressError({
        message: NO_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    cart.isDeleted = true;

    await DI.em.flush();

    logger.info(LOG_MESSAGE_DB_DELETE_USER_CART_REQUEST_END,
      { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    return new DeleteResponce({ success: true });
  }

  async emptyUserCart (userId: string): Promise<DeleteResponce> {
    logger.debug(LOG_MESSAGE_DB_EMPTY_USER_CART_REQUEST_START,
      { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    const cart = await this.requestUserCart(userId);

    if (!cart) {
      logger.error(LOG_MESSAGE_DB_EMPTY_USER_CART_REQUEST_NO_CART_ERROR,
        { userId, serviceLavel:  ServiceLevel.REPOSITORY });

      throw new ExpressError({
        message: NO_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    if (cart.items.isEmpty()) {
      logger.error(LOG_MESSAGE_DB_EMPTY_USER_CART_REQUEST_NO_PRODUCTS_ERROR,
        { userId, serviceLavel:  ServiceLevel.REPOSITORY });

      throw new ExpressError({
        message: NO_ITEMS_IN_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    cart.items.removeAll();

    await DI.em.flush();

    logger.info(LOG_MESSAGE_DB_EMPTY_USER_CART_REQUEST_END,
      { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    return new DeleteResponce({ success: true });
  }

  async createOrder (
    userId: string,
    payment: Payment,
    delivery: Delivery,
    comments: string,
    status: ORDER_STATUS,
  ): Promise<Order> {
    logger.debug(LOG_MESSAGE_DB_CREATE_ORDER_REQUEST_START,
      { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    const cart = await this.requestUserCart(userId);

    if (!cart) {
      logger.error(LOG_MESSAGE_DB_CREATE_ORDER_REQUEST_NO_CART_ERROR,
        { userId, serviceLavel:  ServiceLevel.REPOSITORY });

      throw new ExpressError({
        message: NO_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    if (cart.items.isEmpty()) {
      logger.error(LOG_MESSAGE_DB_CREATE_ORDER_REQUEST_NO_PRODUCTS_ERROR,
        { userId, serviceLavel:  ServiceLevel.REPOSITORY });

      throw new ExpressError({
        message: NO_ITEMS_IN_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    const newOrder = new Order({
      userId: cart.userId,
      cartId: cart.id,
      status,
      total: cart.total,
      comments,
      items: cart.items,
      payment,
      delivery,
    });

    await DI.em.persistAndFlush(newOrder);

    logger.info(LOG_MESSAGE_DB_CREATE_USER_CART_REQUEST_END,
      { userId, serviceLavel:  ServiceLevel.REPOSITORY });

    return newOrder;
  }
}
