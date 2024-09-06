import { CartEntity, CartItemEntity } from "../models/cart.entity";
// import { ProductEntity } from '../models/product.entity';
import { ProductDAL } from '../products/products.repository';
// import { DeleteResponce } from '../models/responce.entity';
// import { ExpressError } from '../models/error.entity';
// import { NO_ITEMS_IN_CART_FOUND_MESSAGE, ServerResponseCodes } from '../constants';
// import { Delivery, ORDER_STATUS, OrderEntity, Payment } from '../models/order.entity';
import { DI } from '../server';

import { Cart } from '../database/models/cart.entity';
import { CartItem } from "../database/models/cartItem.entity";
export class CartDAL {
    private productDAL: ProductDAL;

    constructor(productDAL: ProductDAL) {
        this.productDAL = productDAL;
    }

    async getUserCart(userId: string): Promise<CartEntity | void> {
        const cart = await DI.cart.findOne({ userId: userId}, {
            populate: ['items.product'],
        });

        if(cart === null) {
            return;
        }

        const cartItems = cart.items?.getItems().map((item) => {
            return new CartItemEntity({...item, cartId: cart.id})
        });

        const totalCountOfItems = cartItems?.reduce((acc, curr) => {
            return acc + (curr.count * curr.product.price);
        }, 0) || 0;

        return new CartEntity({ ...cart, items: cartItems, total: totalCountOfItems });
    }

    async createUserCart(userId: string): Promise<CartEntity> {

        const newCart = new Cart({ userId: userId, isDeleted: false, total: 0 });

        await DI.em.persistAndFlush(newCart);

        return new CartEntity({...newCart, items: []});
    }

    async updateUserCart(userId: string, product: { productId: string, count: number }): Promise<CartEntity> {
        const cart = await DI.cart.findOne({ userId: userId}, {
            populate: ['items.product'],
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        
        const productItem =  await DI.product.findOne({ id: product.productId });

        if (!productItem) {
            throw new Error('Product not found');
        }


        let cartItem = cart?.items.getItems().find((item) => item.product.id === product.productId);

        if (cartItem) {
            cartItem.count += product.count;
        } else {
            cartItem = new CartItem(product.count, cart, productItem);
            cart.items.add(cartItem);
        }

        const totalCountOfItems = cart.items.getItems().reduce((acc, curr) => {
            return acc + (curr.count * curr.product.price);
        }, 0) || 0;


        cart.total = totalCountOfItems;

        const cartItems = cart.items?.getItems().map((item) => {
            return new CartItemEntity({...item, cartId: cart.id})
        });

        return new CartEntity({ ...cart, items: cartItems, total: totalCountOfItems });
    }

    // async emptyUserCart(userId: string): Promise<DeleteResponce> {
    //     const userCart = await this.getUserCart(userId);

    //     const { deletedCount } = await CartItem.deleteMany({cartId: userCart.id}); 

    //     if(!deletedCount) {
    //         throw new ExpressError( {message: NO_ITEMS_IN_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
    //     }

    //     return new DeleteResponce({ success: true });
    // }

    // async chackoutUserCart(userId: string, payment: Payment, delivery: Delivery, comments: string, status: ORDER_STATUS): Promise<OrderEntity>{
    //     const { id: cartId, items, total } = await this.getUserCart(userId);

    //     const newOrder = new Order({userId, 
    //         cartId, 
    //         items: items.map((item) => new CartItem({ cartId: cartId, productId: item.product.id, count: item.count})), 
    //         payment, 
    //         delivery, 
    //         comments, 
    //         status, 
    //         total});

    //     const newOrderResponse = (await newOrder.save()).toObject();

    //     await this.emptyUserCart(userId);

    //     return new OrderEntity({...newOrderResponse, items, id: newOrderResponse._id as string}) 
    // }
}
