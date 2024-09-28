import { CartItem } from '../database/models/cartItem.entity';

export const getCartTotal = (items: CartItem[]): number =>
  items.reduce((acc, curr) => acc + curr.count * curr.product.price, 0) || 0;
