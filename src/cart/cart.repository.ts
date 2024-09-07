import { CartEntity, CartItemEntity } from "../models/cart.entity";
import { ProductDAL } from '../products/products.repository';
import { DI } from '../server';
import { Cart } from '../database/models/cart.entity';
import { CartItem } from "../database/models/cartItem.entity";
import { getCartTotal } from "./cart.utils";
import { ExpressError } from "../models/error.entity";
import { DeleteResponce } from "../models/responce.entity"
import { NO_ITEMS_IN_CART_FOUND_MESSAGE, NO_PRODUCT_FOUND_MESSAGE, NO_CART_FOUND_MESSAGE, ServerResponseCodes } from "../constants"
import { Delivery, ORDER_STATUS, OrderEntity, Payment } from "../models/order.entity";
import { Order } from "../database/models/order.entity";
export class CartDAL {
    private productDAL: ProductDAL;

    constructor(productDAL: ProductDAL) {
        this.productDAL = productDAL;
    }

    async getUserCart(userId: string): Promise<CartEntity | void> {
        const cart = await DI.cart.findOne({ userId: userId, isDeleted: false}, {
            populate: ['items.product'],
        });

        if(cart === null) {
            return;
        }

        const cartItems = cart.items?.getItems();
    
        const cartTotal = getCartTotal(cartItems);
        
        const cartItemsEntity = cartItems.map((item) => new CartItemEntity({...item, cartId: cart.id}));

        return new CartEntity({ ...cart, items: cartItemsEntity, total: cartTotal });
    }

    async createUserCart(userId: string): Promise<CartEntity> {

        const newCart = new Cart({ userId: userId, isDeleted: false, total: 0 });

        await DI.em.persistAndFlush(newCart);

        return new CartEntity({...newCart, items: []});
    }

    async updateUserCart(userId: string, product: { productId: string, count: number }): Promise<CartEntity> {
        const cart = await DI.cart.findOne({ userId: userId, isDeleted: false}, {
            populate: ['items.product'],
        });

        if (!cart) {
            throw new ExpressError( {message: NO_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }

        
        const productItem =  await DI.product.findOne({ id: product.productId });

        if (!productItem) {
            throw new ExpressError( {message: NO_PRODUCT_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }


        let cartItem = cart?.items.getItems().find((item) => item.product.id === product.productId);

        if (cartItem) {
            cartItem.count += product.count;
        } else {
            cartItem = new CartItem(product.count, cart, productItem);
            cart.items.add(cartItem);
        }

        const cartItems = cart.items?.getItems();

        const cartTotal = getCartTotal(cartItems);

        cart.total = cartTotal;

        await DI.em.flush();

        const cartItemsEntity = cartItems.map((item) => new CartItemEntity({...item, cartId: cart.id}));

        return new CartEntity({ ...cart, items: cartItemsEntity });
    }

    async emptyUserCart(userId: string): Promise<DeleteResponce> {
        const cart = await DI.cart.findOne({ userId: userId, isDeleted: false}, {
            populate: ['items'],
        });

        if(!cart){
            throw new ExpressError( {message: NO_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }

        if(!cart.items.isEmpty()) {
            throw new ExpressError( {message: NO_ITEMS_IN_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }

        cart.isDeleted = true;

        await DI.em.flush();

        return new DeleteResponce({ success: true });
    }

    async chackoutUserCart(userId: string, payment: Payment, delivery: Delivery, comments: string, status: ORDER_STATUS): Promise<OrderEntity>{
        const cart = await DI.cart.findOne({ userId: userId, isDeleted: false}, {
            populate: ['items'],
        });

        if(!cart){
            throw new ExpressError( {message: NO_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }

        if(!cart.items.isEmpty()) {
            throw new ExpressError( {message: NO_ITEMS_IN_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }

        const newOrder = new Order({
            userId: cart.userId,
            cartId: cart.id,
            status,
            total: cart.total,
            comments,
            items: cart.items,
            payment,
            delivery
        });

        await DI.em.persistAndFlush(newOrder);

        return new OrderEntity({...newOrder, items: newOrder.items.map((item) => new CartItemEntity({...item, cartId: cart.id}))});
    }
}
