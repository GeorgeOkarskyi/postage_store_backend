import { CartEntity, CartItemEntity } from "../models/cart.entity";
// import { ProductEntity } from '../models/product.entity';
import { ProductDAL } from '../products/products.repository';
// import { DeleteResponce } from '../models/responce.entity';
// import { ExpressError } from '../models/error.entity';
// import { NO_ITEMS_IN_CART_FOUND_MESSAGE, ServerResponseCodes } from '../constants';
// import { Delivery, ORDER_STATUS, OrderEntity, Payment } from '../models/order.entity';
import { DI } from '../server';

import { Cart } from '../database/models/cart.entity';

export class CartDAL {
    private productDAL: ProductDAL;

    constructor(productDAL: ProductDAL) {
        this.productDAL = productDAL;
    }

    async getUserCart(userId: string): Promise<CartEntity | void> {

        const carts = await DI.cart.findAll();
        console.log(carts);

        const cart = await DI.cart.findOne({ userId: userId}, {
            populate: ['items.product'],
        });

        console.log('||||||||Cart found:', cart);

        if(cart === null) {
            return;
        }

        await cart?.items?.loadItems();


        console.log('||||||||Cart found:', cart);
        

        // new CartItemEntity({product: {id: '21343', title: 'sds', description: 'description', price: 23}, id: '1234', cartId: 'dsf', count: 34})

        return new CartEntity({ ...cart, items: [ new CartItemEntity({product: {id: '21343', title: 'sds', description: 'description', price: 23}, id: '1234', cartId: 'dsf', count: 34})], total: 9 });
    }

    async createUserCart(userId: string): Promise<CartEntity> {

        const newCart = new Cart({ userId: userId, isDeleted: false, total: 0 });

        // await DI.cart.persistAndFlush(newCart);

        return new CartEntity({...newCart, items: []});
    }

    // async updateUserCart(userId: string, product: { productId: string, count: number }): Promise<CartEntity> {
    //     const { id: userCartId } = await this.getUserCart(userId);

    //     if(!product.count){
    //         await CartItem.deleteOne({productId: product.productId})

    //         return await this.getUserCart(userId);
    //     }

    //     const isItemExistInCart = (await CartItem.find({ cartId: userCartId, productId: product.productId })).length;


    //     if(isItemExistInCart) {
    //         await CartItem.updateOne({ cartId: userCartId, productId: product.productId }, 
    //             { $set: { count: product.count } });
    //     } else {
    //         const cartItem = new CartItem({ cartId: userCartId, productId: product.productId, count: product.count});
    //         await cartItem.save();
    //     }

    //     return await this.getUserCart(userId);
    // }

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
