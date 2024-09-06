import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/core';
import { Product } from './models/product.entity';
import { Cart } from './models/cart.entity';
import { Order } from './models/order.entity';
import { CartItem } from './models/cartItem.entity';
import http from 'http';

export interface Services {
  server?: http.Server;
  orm: MikroORM;
  em: EntityManager;
  product: EntityRepository<Product>;
  cart: EntityRepository<Cart>;
  order: EntityRepository<Order>;
  cartItem: EntityRepository<CartItem>;
};

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(options);

  // save to cache before returning
  return cache = {
    orm,
    em: orm.em,
    product: orm.em.getRepository(Product),
    cart: orm.em.getRepository(Cart),
    order: orm.em.getRepository(Order),
    cartItem: orm.em.getRepository(CartItem)
  };
}
