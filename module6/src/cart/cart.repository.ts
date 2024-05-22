import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CartEntity, CartItemEntity } from "../models/cart.entity";
import { addItemCsv, deleteItemFromCsv, findItemsInCsv, updateCsv } from '../joi/joi';
import { ProductEntity } from '../models/product.entity';
import { CartItemStorage, CartStorage } from '../joi/storage/storage.entities';
import { ProductDAL } from '../products/products.repository';
import { DeleteResponce } from '../models/responce.entity';
import { ExpressError } from '../models/error.entity';
import { NO_ITEMS_IN_CART_FOUND_MESSAGE, ServerResponseCodes } from '../constants';
import { CART_CSV_FILE_PATH, CART_ITEMS_CSV_FILE_PATH } from '../joi/joi.constants';
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
        )) 

        return new CartEntity({ ...cart, items: cartItems});
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
        const userCartId = userCart.id;

        const userItemsToDelete = await findItemsInCsv<CartItemStorage>(CART_ITEMS_CSV_FILE_PATH, (item) => {
            return item.cartId === userCartId;
        });

        if(!userItemsToDelete.length) {
            throw new ExpressError( {message: NO_ITEMS_IN_CART_FOUND_MESSAGE, status: ServerResponseCodes.NotFound});
        }

        userItemsToDelete.forEach(async (itemToDelete: CartItemStorage) => {
            await deleteItemFromCsv<CartItemStorage>(CART_ITEMS_CSV_FILE_PATH, itemToDelete.id)
        });

        return new DeleteResponce({ success: true });
    }
}
