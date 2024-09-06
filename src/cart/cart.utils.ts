import { CartItem } from "../database/models/cartItem.entity";

export const getCartTotal = (items: CartItem[]): number => {
    return items.reduce((acc, curr) => {
        return acc + (curr.count * curr.product.price);
    }, 0) || 0;
}