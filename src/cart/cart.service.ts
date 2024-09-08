import { CartEntity, CartItemEntity } from "../models/cart.entity";
import { Delivery, ORDER_STATUS, OrderEntity, Payment } from "../models/order.entity";
import { DeleteResponce } from "../models/responce.entity";
import { ProductDAL } from "../products/products.repository";
import { CartDAL } from "./cart.repository";

class CartService {
    private cartDAL: CartDAL

    constructor( cartDAL: CartDAL ) {
        this.cartDAL = cartDAL
    }

    async getUserCart(userId: string): Promise<CartEntity> {
        const userCartResponce = await this.cartDAL.getUserCart(userId);
        
        if(!userCartResponce) {
            const createUserCartResponce = this.cartDAL.createUserCart(userId);

            return createUserCartResponce;
        }

        return userCartResponce;
    }

    async updateUserCart(userId: string, product: { productId: string, count: number }): Promise<CartEntity> {
        const updateUserCartResponce = await this.cartDAL.updateUserCart(userId, product);
        
        return updateUserCartResponce
    }

    async emptyUserCart(userId: string): Promise<DeleteResponce>{
        const updateUserCartResponce = await this.cartDAL.emptyUserCart(userId);

        return updateUserCartResponce;
    }

    async chackoutUserCart(userId: string, { payment, delivery, comments, status }: { payment: Payment, delivery: Delivery, comments: string, status: ORDER_STATUS }): Promise<OrderEntity>{
        const checkoutUserCartResponse = await this.cartDAL.chackoutUserCart(userId, payment, delivery, comments, status);
        
        if(checkoutUserCartResponse) {
            await this.cartDAL.emptyUserCart(userId);
        }
        
        return checkoutUserCartResponse;
    }
}

const productDAL = new ProductDAL();
const cartDAL = new CartDAL(productDAL);

export default new CartService(cartDAL);