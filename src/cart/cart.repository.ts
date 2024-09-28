import {
  NO_CART_FOUND_MESSAGE,
  NO_ITEMS_IN_CART_FOUND_MESSAGE,
  NO_PRODUCT_FOUND_MESSAGE,
  ServerResponseCodes,
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

export class CartDAL {
  async requestUserCart (userId: string): Promise<Cart | null> {
    return DI.cart.findOne(
      { userId: userId, isDeleted: false },
      {
        populate: ['items.product'],
      },
    );
  }

  async createUserCart (userId: string): Promise<Cart> {
    const newCart = new Cart({ userId: userId, isDeleted: false, total: 0 });

    await DI.em.persistAndFlush(newCart);

    return newCart;
  }

  async updateUserCart (
    userId: string,
    product: { productId: string; count: number },
  ): Promise<Cart> {
    const cart = await this.requestUserCart(userId);

    if (!cart) {
      throw new ExpressError({
        message: NO_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    const productItem = await DI.product.findOne({ id: product.productId });

    if (!productItem) {
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

    return cart;
  }

  async deleteUserCart (userId: string): Promise<DeleteResponce> {
    const cart = await this.requestUserCart(userId);

    if (!cart) {
      throw new ExpressError({
        message: NO_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    cart.isDeleted = true;

    await DI.em.flush();

    return new DeleteResponce({ success: true });
  }

  async emptyUserCart (userId: string): Promise<DeleteResponce> {
    const cart = await this.requestUserCart(userId);

    if (!cart) {
      throw new ExpressError({
        message: NO_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    if (cart.items.isEmpty()) {
      throw new ExpressError({
        message: NO_ITEMS_IN_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    cart.items.removeAll();

    await DI.em.flush();

    return new DeleteResponce({ success: true });
  }

  async chackoutUserCart (
    userId: string,
    payment: Payment,
    delivery: Delivery,
    comments: string,
    status: ORDER_STATUS,
  ): Promise<Order> {
    const cart = await this.requestUserCart(userId);

    if (!cart) {
      throw new ExpressError({
        message: NO_CART_FOUND_MESSAGE,
        status: ServerResponseCodes.NotFound,
      });
    }

    if (cart.items.isEmpty()) {
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

    return newOrder;
  }
}
