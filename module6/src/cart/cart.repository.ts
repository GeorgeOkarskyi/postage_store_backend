import { v4 as uuidv4 } from 'uuid';
import { CartEntity, CartItemEntity } from "../models/cart.entity";
import { addItemCsv, deleteItemFromCsv, findItemsInCsv, updateCsv } from '../storage/storage';
import { ProductEntity } from '../models/product.entity';
import { CartItemStorage, CartStorage } from '../storage/storage.entities';
import { ProductDAL } from '../products/products.repository';
import { DeleteResponce } from '../models/responce.entity';
import { ExpressError } from '../models/error.entity';
import { NO_ITEMS_IN_CART_FOUND_MESSAGE, ServerResponseCodes } from '../constants';
import { CART_CSV_FILE_PATH, CART_ITEMS_CSV_FILE_PATH, ORDERS_CSV_FILE_PATH } from '../storage/storage.constants';
import { Delivery, ORDER_STATUS, OrderEntity, Payment } from '../models/order.entity';
export class CartDAL {
    private productDAL: ProductDAL;

    constructor(productDAL: ProductDAL) {
        this.productDAL = productDAL;
    }

    async getUserCart(userId: string): Promise<CartEntity> {
        const cart = (await findItemsInCsv<CartStorage>(CART_CSV_FILE_PATH, (cart) => cart.userId === userId))[0];

        if(!cart) {
            return null;
        }

        const cartItemsResponce = (await findItemsInCsv<CartItemStorage>(CART_ITEMS_CSV_FILE_PATH, (cartItem) => cartItem.cartId === cart.id));

        const cartItems = await Promise.all(cartItemsResponce
            .map(async (cartItem: CartItemStorage) => {
                const productResponce = await this.productDAL.getProduct(cartItem.productId);

                return new CartItemEntity({...cartItem, product: new ProductEntity(productResponce)});
            }
        )); 

        const total = cartItems.reduce((acc, { product, count }) => {
            return acc + (product.price * count);
        }, 0);

        return new CartEntity({ ...cart, items: cartItems, total});
    }

    async createUserCart(userId: string): Promise<CartEntity> {
        const newCart = new CartStorage({ id: uuidv4(), userId: userId, isDeleted: false });

        const createUserCartResponce: CartStorage = await addItemCsv<CartStorage>(
            CART_CSV_FILE_PATH, 
            newCart
        );

        return new CartEntity({...createUserCartResponce, items: []});
    }

    async updateUserCart(userId: string, product: { productId: string, count: number }): Promise<CartEntity> {
        const userCart = await this.getUserCart(userId);
        const userCartId = userCart.id;

        if(!product.count){
            await deleteItemFromCsv(CART_ITEMS_CSV_FILE_PATH, product.productId);

            return await this.getUserCart(userId);
        }

        const isItemExistInCart = (await findItemsInCsv<CartItemStorage>(CART_ITEMS_CSV_FILE_PATH, (item) => {
            return item.cartId === userCartId && item.productId === product.productId
        })).length


        if(isItemExistInCart) {
            await updateCsv<CartItemStorage>(CART_ITEMS_CSV_FILE_PATH, item => {
                if(item.cartId === userCartId && item.productId === product.productId) {
                    return {...item, count: product.count};
                }

                return item;
            });
        } else {
            await addItemCsv<CartItemStorage>(CART_ITEMS_CSV_FILE_PATH, new CartItemStorage({id: product.productId, cartId: userCartId, productId: product.productId, count: product.count}));
        }

        return await this.getUserCart(userId);
    }

    async emptyUserCart(userId: string): Promise<DeleteResponce> {
        const userCart = await this.getUserCart(userId);
        const userItemsToDelete = userCart.items;

        if(!userItemsToDelete.length) {
            throw new ExpressError( {message: NO_ITEMS_IN_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }

        for (const itemToDelete of userItemsToDelete) {
            await deleteItemFromCsv<CartItemStorage>(CART_ITEMS_CSV_FILE_PATH, itemToDelete.product.id);
        }

        return new DeleteResponce({ success: true });
    }

    async chackoutUserCart(userId: string, payment: Payment, delivery: Delivery, comments: string, status: ORDER_STATUS): Promise<OrderEntity>{
        const { id: cartId, items, total } = await this.getUserCart(userId);

        const newOrder = new OrderEntity({ id: uuidv4(), userId, cartId, items, payment, delivery, comments, status, total});

        await addItemCsv<OrderEntity>(ORDERS_CSV_FILE_PATH, newOrder);

        await this.emptyUserCart(userId);
        
        return newOrder
    }
}
